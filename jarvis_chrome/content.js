Promise.all([
	new Promise((res) => {
		if(window.jQuery)
			res();
		else{
			var s=document.createElement('script');
			s.onload = () => res();
			s.src=chrome.extension.getURL('jquery.min.js');
			document.head.appendChild(s);
		}
	}),
	new Promise((res) => {
		  var s=document.createElement('script');
		  s.onload = () => res();
		  s.src=chrome.extension.getURL('three.js');
		  document.head.appendChild(s);
	}).then(() => {
		return new Promise((res) => {
			var s=document.createElement('script');
			s.onload = () => res();
			s.src=chrome.extension.getURL('leap-0.6.2.js');
			document.head.appendChild(s);
		});
	}).then(() => {
		return new Promise((res) => {
			var s=document.createElement('script');
			s.onload = () => res();
			s.src=chrome.extension.getURL('leap-plugins-0.1.6.1.js');
			document.head.appendChild(s);
		});
	}).then(() => {
	  return new Promise((res) => {
		  var s=document.createElement('script');
		  s.onload = () => res();
		  s.src=chrome.extension.getURL('leap.rigged-hand-0.1.4.min.js');
		  document.head.appendChild(s);
	  });
	})
])
.then(() => {
	var s=document.createElement('script');
	s.src=chrome.extension.getURL('jarvis.js');
	document.head.appendChild(s);
});