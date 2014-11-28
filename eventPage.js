chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var ajax = new XMLHttpRequest();
  if(request.url) {

    ajax.open('POST', 'http://raspberrypi.local:8082/media/play', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send('{"Url":"' + request.url + '"}');
    console.log('{"Url":"' + request.url + '"}');

    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        chrome.windows.create({
          //url: 'chrome-extension://oeijbnjglfapiglcnahlnilpfikapkfh/app/index.html',
          url: 'http://raspberrypi.local/index.html',
          type: 'panel',
          width: 225,
          height: 400
        }, function(window) {
          chrome.windows.update(window.id, {
            //height: 200,
            drawAttention: true
          });
        });
      }
    }
    // Testing
    /*chrome.windows.create({
      url: 'chrome-extension://oeijbnjglfapiglcnahlnilpfikapkfh/app/index.html',
      type: 'panel',
      width: 225,
      height: 400
    }, function(window) {
      chrome.windows.update(window.id, {
        //height: 200,
        drawAttention: true
      });
    });*/
    

  } else if(request.pause) {
    ajax.open('POST', 'http://raspberrypi.local:8082/media/pause', true);
    ajax.send('{"Pause":"' + request.pause + '"}');
    console.log('{"Pause":"' + request.pause + '"}');
  } else if(request.scriptName && request.styleName) {
    ajax.open('GET', 'http://raspberrypi.local/' + request.scriptName + '?timestamp=' + new Date().getTime(), false);
    ajax.send();

    var script = ajax.responseText;

    ajax.open('GET', 'http://raspberrypi.local/' + request.styleName + '?timestamp=' + new Date().getTime(), false);
    ajax.send();

    var style = ajax.responseText;

    sendResponse({scriptContent: script, styleContent: style});
  }
});
