(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for time display
var $romanValue;
$("input[name=roman]").change(function () {
 $romanValue = parseInt(this.value);
});

function loadOptions() {
 if (localStorage.roman) {
  $romanValue = localStorage.roman;
//  console.log('localStorage.roman: ' + $romanValue);
  // setting radio' value
 } else {
  $romanValue = 1;
//  console.log('localStorage.roman was undefined, now set to: ' + $romanValue);
 }
 $("input[name=roman][value='" + $romanValue + "']").attr('checked', 'checked');

 var $bgColorPicker = $('#bgColorPicker');
 if (localStorage.bgColor) {
  $bgColorPicker[0].value = localStorage.bgColor;
 }
 
} 

function getAndStoreConfigData() {
 var $bgColorPicker = $('#bgColorPicker');

 console.log('roman value: ' + $romanValue);

 var options = {
  roman:   $romanValue,
  bgColor: $bgColorPicker.val()
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.roman = $romanValue;
 localStorage.bgColor = options.bgColor;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
