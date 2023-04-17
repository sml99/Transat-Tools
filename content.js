// content.js
  console.log("F");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'print_address') {

    if (window.location.href.startsWith('http://10.40.99.8:8080/Transat-CRM/Client/')) {
      console.log("address");
      const addressElement = document.querySelector('#adresse1 td:nth-child(3)');
      const address = addressElement.textContent.trim();
      console.log(address);
    }
  }
});
chrome.runtime.sendMessage('print_address');
const button = document.querySelector('#adresse1 button');
button.addEventListener('click', () => {
  chrome.runtime.sendMessage('print_address');
});
