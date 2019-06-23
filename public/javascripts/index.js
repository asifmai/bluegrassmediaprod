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
});

$(document).ready(function () {
  document.getElementById('date').value = getDate();
  
  $('#methodofcontact').change(function (e) { 
    e.preventDefault();
    if($(this).val() == 'email') {
      $('input#date').css('display', 'none')
    } else {
      $('input#date').css('display', 'block')
    }
  });
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