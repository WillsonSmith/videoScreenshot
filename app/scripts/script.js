/*To Do
  - Hide iframe
  - Pause video
  - Get current paused time (top window)
  - set video in iFrame to paused
  - THEN take screenshot
  */

var ext = (function extension(){

  var videosOnPage,
      canvasTime;

  return {

    init: function(){

      var exploded = document.URL.split("/");

      var baseUrl = exploded[0] + "//" + exploded[1] + exploded[2] + "/";

        ext.createCanvas();

        ext.checkTop();

        ext.msgHandler(baseUrl);


    },

    createCanvas: function(){

      var body = document.getElementsByTagName('body')[0],
          can = document.createElement('canvas'),
          date = new Date();

          canvasTime = Math.floor(date.getTime() * Math.PI);

          can.setAttribute('id', canvasTime);

          body.appendChild(can);


          document.getElementById(canvasTime).style.display = 'none';

    },

    checkTop: function(){

      var base,
          url,
          video;

      if (window.self !== window.top) {

        if (document.querySelector('video') != null){
          video = document.querySelector('video');
          base = document.querySelector('video').querySelector('source').src;
          url = base.match(/[^/]+$/);

          video.pause();

          video.addEventListener('canplay', function(){

            ext.createImage(url, base);

          }, false)
        }

        //ext.createImage(url, base);

      }

    },

    msgHandler: function(baseUrl){

      var video,
          time;

      chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

        video = document.querySelector('video>source[src*="' + msg.src + '"]' ).parentNode;
        time = video.currentTime;

        console.log(time);

        if (msg.action == 'create_image') {
          if (msg.src != null){

            if (msg.base !== baseUrl) {

              if (!document.getElementById('iframe-videoCapture-Frame')){

                ext.createIframe(msg.src, msg.full + "#t=" + time);

              }else{

                document.getElementById('iframe-videoCapture-Frame').src = msg.full;
              }

            } else {

              ext.createImage(msg.src, msg.full);

            }

          }
        }
      });

    },

    videoTime: function(){


    },

    createImage: function(src, fullUrl){

      var vid = document.querySelector('video>source[src*="' + src + '"]' ).parentNode,
          can = document.getElementById(canvasTime),
          con = can.getContext('2d');

          console.log(vid);
          //vid.addEventListener('loadeddata', function() {


      // it's loaded

              can.width = vid.offsetWidth;
              can.height = vid.offsetHeight;

              con.drawImage(vid, 0, 0, vid.offsetWidth, vid.offsetHeight);



              chrome.extension.sendRequest({image_link: can.toDataURL("img/png")},
              function(response) {});


           //}, false);


    },

    createIframe: function(url, base){

      var vid = document.createElement('iframe');

      var iframeBody;
      var date = new Date();
      var time = date.getTime();
      var frameBody;

        vid.width = 600;
        vid.height = 500;

        vid.src = base;
        vid.id = 'iframe-videoCapture-Frame';

        frameBody = document.getElementsByTagName('body')[0].appendChild(vid);
        document.getElementById('iframe-videoCapture-Frame').style.dispaly = 'none';
        /*document.getElementById('iframe-videoCapture-Frame').onload = function(){
          iframeBody = document.getElementById(time).contentWindow.document.querySelector('body');
          iframeBody.querySelector('video').pause();
          //ext.createImage(url, base);

        }*/

    }

  };

})();

ext.init();
