chrome.commands.onCommand.addListener(function(command) {
  if (command === 'show-interv') {
    chrome.browserAction.openPopup();
  }
});