var functionJSON = {
	bilibili: false
};


// var bg = chrome.extension.getBackgroundPage();
//再在返回的对象上调用background.js 里面的函数
//
// document.getElementById('protecteyesmodebutton').addEventListener("click", function() {
//     bg.runJavaScript();
// });


function setLocalStorage(cname, cvalue, exdays) {
	localStorage[cname] = cvalue;
}

function getLocalStorage(cname) {
	return localStorage[cname];
}

function UpdatePopup() {
	document.getElementById("bilibili").checked = functionJSON["bilibili"];
}

function init() {


	var temp = getLocalStorage("functionJSON");
	if (temp) {
		Object.assign(functionJSON, JSON.parse(temp));
		UpdatePopup();
	} else {
		setLocalStorage("functionJSON", JSON.stringify(functionJSON), 365);
	}
}
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request, sender, sendResponse)
		if (request.cmd === "wzplug-in") {
			port.postMessage(functionJSON);
		}
	}
);
chrome.tabs.query({
		active: true,
		currentWindow: true
	},
	function(tabs) {
		var port = chrome.tabs.connect( //建立通道
			tabs[0].id, {
				name: "load"
			} //通道名称
		);
		document.getElementById("bilibili").onchange = function() {
			console.log(tabs)
			if (!tabs[0].url.indexOf("www.bilibili.com") === -1) return;
			functionJSON["bilibili"] = document.getElementById("bilibili").checked;
			setLocalStorage("functionJSON", JSON.stringify(functionJSON), 365);
			port.postMessage(functionJSON); //向通道中发送消息
			console.log("发送消息", functionJSON);
		}


		port.onMessage.addListener(function(msg) { //这里同时利用通道建立监听消息，可以监听对方返回的消息
			console.log("port.onMessage", msg)
		});
		init();
		port.postMessage(functionJSON); //向通道中发送消息
		console.log("onload发送消息", functionJSON);
	});
