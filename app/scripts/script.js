var ext = (function extension(){

  var videosOnPage,
      canvasTime;

  return {

    init: function(){

      var body = document.getElementsByTagName('body')[0],
          can = document.createElement('canvas'),
          date = new Date();


        chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

          if (msg.action == 'create_image') {
            if (msg.src != null){

              ext.createImage(msg.src, sendResponse);

            }
          }
        });

        canvasTime = Math.floor(date.getTime() * Math.PI);

        can.setAttribute('id', canvasTime);

        body.appendChild(can);

        document.getElementById(canvasTime).style.display = 'none';

    },

    createImage: function(src){

      var vid = document.querySelector('video>source[src="' + src + '"]' ).parentNode,
          can = document.getElementById(canvasTime),
          con = can.getContext('2d');
          can.width = vid.offsetWidth;
          can.height = vid.offsetHeight;

          con.drawImage(vid, 0, 0);

          chrome.extension.sendRequest({image_link: can.toDataURL("img/png")},
          function(response) {});
        },

    saveImage: function(){



    }

  }

})();

ext.init();
