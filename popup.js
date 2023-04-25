function copyToClipboard(text) {
  var input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

document.addEventListener('DOMContentLoaded', function() {
  // ZTE
  var zteUser = "Admin";
  var ztePass = "Zte@Consumers251";
  var zteTrPass = "Transat20";
  var zteText = "ZTE: user: \"" + zteUser + "\" pass: \"" + ztePass + "\"";

  // H1000
  var h1000User = "admin";
  var h1000Text = "H1000: user: \"" + h1000User + "\"";

  // H2000
  var h2000User = "NQS";
  var h2000Text = "H2000: user: \"" + h2000User + "\"";

  // Add event listeners to the buttons
  document.getElementById("zte-button-ad").addEventListener("click", function() {
    copyToClipboard(zteUser);
  });
  document.getElementById("zte-button").addEventListener("click", function() {
    copyToClipboard(ztePass);
  });
  document.getElementById("zte-button-tr").addEventListener("click", function() {
    copyToClipboard(zteTrPass);
  });
 /* document.getElementById("h1000-button").addEventListener("click", function() {
    copyToClipboard(h1000Text);
  });
  document.getElementById("h2000-button").addEventListener("click", function() {
    copyToClipboard(h2000Text);
  });*/
});
