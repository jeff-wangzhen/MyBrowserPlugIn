var functionJSON = {
    bilibili: false
};

function setLocalStorage(cname, cvalue) {
    localStorage[cname] = cvalue;
}

function getLocalStorage(cname) {
    return localStorage[cname];
}

var temp = getLocalStorage("functionJSON");
if (temp) {
    Object.assign(functionJSON, JSON.parse(temp))

} else {
    setLocalStorage("functionJSON", JSON.stringify(functionJSON), 365)
}

var wzPlugin = function() {


    var sLocation = window.location.href;
    console.log("当前网址：", sLocation);
    if (sLocation.indexOf("blog.csdn.net") > -1) {
        // var setCodeLineFloatNoneStyle = document.createElement('style');
        // setCodeLineFloatNoneStyle.innerHTML = '.htmledit_views code ol li div.hljs-ln-code, .htmledit_views code ol li div.hljs-ln-numbers {\n' +
        //     '    float: none !important;\n' +
        //     '}';
        // document.head.appendChild(setCodeLineFloatNoneStyle);
        var oReadButton = document.getElementById('btn-readmore');
        if (oReadButton !== null) {
            oReadButton.click();
            console.log("这是CSDN网站，已经自动加载全文");
        }
        oReadButton = document.getElementsByClassName('btn-readmore')[0];
        if (oReadButton !== null) {
            oReadButton.click();
            console.log("这是CSDN网站，已经自动加载全文");
        }
    } else if (sLocation.indexOf("360doc.com") > -1 && (oLayerLogin = document.getElementById('LayerLogin'))) {
        oLayerLogin.parentNode.removeChild(oLayerLogin);
        scriptNode = document.createElement("script");
        scriptNode.innerHTML += "\n\
           document.body.oncopy =null;\n\
           function copyArt(){return true}";
        document.body.appendChild(scriptNode);

    } else if (sLocation.indexOf("readers365.com") > -1) {
        console.log("readers365");
        let paging;
        if ((paging = document.getElementById('object1')) != null) {
            paging.style.position = "fixed";
            console.log("readers365 fixed");
        }
    } else if (sLocation.indexOf("wenku.baidu.com") > -1) {
        console.log("百度文库");
        var scriptNode = document.createElement("script");
        docNode = document.getElementsByClassName("doc-reader");
        copyBtn = document.getElementById("ZeroClipboardMovie_1");
        scriptNode.innerHTML += "\n" +
            "function copyWZ(){a= document.getElementById(\"reader-container-1\");" +
            "$(a).off('copy');" +
            "docNode=$(\"div.bd.doc-reader\");" +
            "docNode.get(0).removeAttribute(\"oncopy\");" +
            "console.log(\"可以复制\");}copyWZ();";
        document.body.appendChild(scriptNode);
    } else if (sLocation.indexOf("www.bilibili.com") > -1) {
        //默认关闭bilibili弹幕
        var scriptNode = document.createElement("script");
        scriptNode.innerHTML += "(function(){" +
            "var count=0;timerFun();\n" +
            "function timerFun(){\n" +
            "count++;\n" +
            "try{document.getElementsByClassName('bui-checkbox')[0].checked=" + !functionJSON["bilibili"] + ";\n" +
            "if(count<20)throw '以防万一，多试几次';}\n" +
            "catch(e){\n" +
            " var timer=setTimeout(function(){\n" +
            " timerFun();\n" +
            " },1000)\n" +
            "}\n" +
            "}\n" +
            "})();";
        document.body.appendChild(scriptNode);
        console.log(scriptNode)
    }


    var requestData = {
        "action": "createContextMenuItem"
    };
    //send request to background script
    chrome.extension.sendRequest(requestData);


    function genericOnClick(info, tab) {
        alert(info.linkUrl);
    }

    function selectionOnClick(info, tab) {
        alert(info.selectionText);
    }

    /*chrome.contextMenus.create({"title": "链接地址","contexts":["link"],"onclick":genericOnClick});
    selection = chrome.contextMenus.create({"title": "选中文字","contexts":["selection"],"onclick":selectionOnClick});*/
};

// chrome.extension.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		console.log(request, sender, sendResponse)
// 		sendResponse("popup返回值");
// 	}
// );
// setTimeout(function() {
// 	console.log(12)
// 	chrome.extension.sendMessage({
// 		cmd: "wzplug-in"
// 	}, function(response) {
// 		update(response);
// 	});
// }, 1000)


chrome.runtime.onConnect.addListener(function(port) { //建立监听

    if (port.name == "load") { //判断通道名称

        port.onMessage.addListener(function(msg) { //监听消息
            update(msg);
        });
    }

});

function update(msg) {
    Object.assign(functionJSON, msg);
    setLocalStorage("functionJSON", JSON.stringify(functionJSON), 365)
    console.log("接收到消息", msg, functionJSON)
    wzPlugin();
}

wzPlugin();
window.addEventListener("DOMContentLoaded", function(e) { //添加DOMContentLoaded事件
    console.log("window.addEventListener", e)

}, false);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("chrome.runtime.onMessage.addListener");
    console.log(request, sender, sendResponse);
    // code...
    // sendResponse('我已收到你的消息：' +JSON.stringify(request));//做出回应
});