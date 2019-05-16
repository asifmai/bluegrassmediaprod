$(function () {
  var BV = new $.BigVideo({
    useFlashForFirefox: false
  }); 
  BV.init();
  if ((/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent)) {
    BV.show('/images/bluegrassmediavideocover.jpg');
  } else {
    BV.show('/videos/bluegrassmedia.mp4', {
      altSource: 'http://video-js.zencoder.com/oceans-clip.ogv'
    });
  }
  BV.getPlayer().volume(0);

  $('body').on('click', '.mute.muted', function () {
    BV.getPlayer().volume(0.8);
    $(this).removeClass('muted').addClass('unmuted');
    return false;
  });

  $('body').on('click', '.mute.unmuted', function () {
    BV.getPlayer().volume(0);
    $(this).removeClass('unmuted').addClass('muted');
    return false;
  });

  document.getElementById('date').value = getDate();
  document.getElementById('time').value = getTime();
});

function getDate() {
  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth();
  var date = dt.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  var dtString = year + "-" + month + "-" + date;
  return dtString;
}

function getTime() {
  var dt = new Date();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var timeString = hours + ":" + minutes;
  return timeString;
}