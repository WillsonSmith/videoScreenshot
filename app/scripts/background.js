'use strict';

/*chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});
*/
chrome.contextMenus.create({
        "title": "Save Video Frame",
        "contexts": ["video"],
        "onclick": function(e) {
          
          var url = e.srcUrl.match(/[^/]+$/);
          var fullUrl = e.srcUrl;

          var exploded = e.srcUrl.split("/");

          var baseUrl = exploded[0] + "//" + exploded[1] + exploded[2] + "/";

          chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

            /*chrome.permissions.request({
              origins: [baseUrl + "*"]
            });*/

            chrome.tabs.sendMessage(tabs[0].id, {action: "create_image", src: url, full: fullUrl, base: baseUrl}, function(response) {});

            /*var vid = document.createElement('iframe');

            var div = document.createElement('div');

            var iframeBody;
            var date = new Date();
            var time = date.getTime();
              vid.width = 600;
              vid.height = 500;
              console.log(fullUrl);
              vid.src = fullUrl;
              vid.id = time;
              //console.log(vid.contentWindow.documen);

              document.getElementsByTagName('body')[0].appendChild(vid);

              document.getElementById(time).onload = function(){
                iframeBody = document.getElementById(time).contentWindow.document.querySelector('body');
                console.log(document.getElementById(time).contentWindow.document.querySelector('body').innerHTML);
                iframeBody.appendChild(div);
              }*/
          });
        }
      });

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  chrome.tabs.create({ url: request.image_link });

});
