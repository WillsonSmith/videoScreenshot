'use strict';

/*chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});
*/
chrome.contextMenus.create({
        "title": "Save Video Frame",
        "contexts": ["video"],
        "onclick": function(e) {

          var url = e.srcUrl.slice(e.pageUrl.length);
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "create_image", src: url}, function(response) {});
          });
        }
      });

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  chrome.tabs.create({ url: request.image_link });

});
