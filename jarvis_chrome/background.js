chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
	code: `console.log('Booting JARVIS...');
	var s=document.createElement('script');
	s.src='file:///C:/Users/MLH-User/Desktop/jarvis/jarvis.js';
	document.head.appendChild(s);`
  });
});

