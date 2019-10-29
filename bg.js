// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


//当browser action 图标被点击的时候触发，
//当browser action是一个popup的时候，这个事件将不会被触发。
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript(null, {
        file: "exec.js" //,
        // code: "alert(4);console.log('tab.url: ' + '"+ tab.url + "'+ '');"
    }, function() {
        console.log("chrome.browserAction.onClicked.addListener(function (tab) ");
    });
});
// chrome.tabs.executeScript(null, {
//     code: 'console.log("bg.js 启动浏览器 chrome.tabs.executeScript")'
// });

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
console.log(tabId,changeInfo,tab)
    //这里的/代码将在用户每次进入新选项卡时运行，因此您可以将脚本插入到每个新选项卡中。

});
// A generic onclick callback function.
function genericOnClick(info, tab) {
    chrome.tabs.executeScript(null, { code: 'window.location.href="https://www.baidu.com/";' });
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}
function runJavaScript() {
 chrome.tabs.executeScript(null, {
        file: "exec.js" //,
        // code: "alert(4);console.log('tab.url: ' + '"+ tab.url + "'+ '');"
    })
}
function setbackgroundGreen() {
   var a=document.getElementById("qb_collection_read_mask");alert(a)
   console.log(a)
    if(a) a.style.backgroundColor="rgb(204,232,207)";
    var b=document.getElementsByClassName("qb-content-wrapper-inner");
    console.log(b)
    if(b) b[0].style.backgroundColor="rgb(204,232,207)";
}



// Create one test item for each context type.
var contexts = ["page", "selection", "link", "editable", "image", "video",
    "audio"
];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({
        "title": title,
        "onclick": genericOnClick
    });
    console.log("'435435345435" + context + "' item:" + id);

}

// Create a parent item and two children.
var parent = chrome.contextMenus.create({ "title": "Test parent item" });
var child1 = chrome.contextMenus.create({ "title": "Child 1", "parentId": parent, "onclick": genericOnClick });
var child2 = chrome.contextMenus.create({ "title": "Child 2", "parentId": parent, "onclick": genericOnClick });
console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


// Create some radio items.
function radioOnClick(info, tab) {
    console.log("radio item " + info.menuItemId +
        " was clicked (previous checked state was " +
        info.wasChecked + ")");
}

var radio1 = chrome.contextMenus.create({
    "title": "Radio 1",
    "type": "radio",
    "onclick": radioOnClick
});
var radio2 = chrome.contextMenus.create({
    "title": "Radio 2",
    "type": "radio",
    "onclick": radioOnClick
});
console.log("radio1:" + radio1 + " radio2:" + radio2);


// Create some checkbox items.
function checkboxOnClick(info, tab) {

    console.log(JSON.stringify(info));
    console.log("checkbox item " + info.menuItemId +
        " was clicked, state is now: " + info.checked +
        "(previous state was " + info.wasChecked + ")");

}

var checkbox1 = chrome.contextMenus.create({ "title": "Checkbox1", "type": "checkbox", "onclick": checkboxOnClick });
var checkbox2 = chrome.contextMenus.create({ "title": "Checkbox2", "type": "checkbox", "onclick": checkboxOnClick });
console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);


// Intentionally create an invalid item, to show off error checking in the
// create callback.

chrome.contextMenus.create({ "title": "Oops" }, function() {
    if (chrome.extension.lastError) {
        console.log("Got expected error: " + chrome.extension.lastError.message);
    }
});