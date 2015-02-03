/*
  author : Eray Arslan
  for : Furkan Başaran <3
 */

$(document).ready(function () {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  function notifyMe(message) {
    var notification = new Notification('fav-kyou', {
      icon: 'https://raw.githubusercontent.com/erayarslan/fav-kyou/master/assert/icon128.png',
      body: message
    });
  }

  var trick = function () {
    $(document).ajaxComplete(function (event, request, settings) {
      document.body.dispatchEvent(new CustomEvent('trick' , { detail : JSON.stringify(settings)}));
    });
  };

  var injectedScript = document.createElement('script');
  injectedScript.type = 'text/javascript';
  injectedScript.text = '(' + trick + ')("");';
  document.body .appendChild(injectedScript);

  document.body.addEventListener('trick', function(e) {
    var favorite_messages = ["YAPMA", "OLDU MU ŞİMDİ BU?", "ERAY KÜFÜR EDİYOR, HATIRLA!", "HOŞ MU?", "KOMİK Mİ ŞİMDİ BU?"];
    var unfavorite_messages = ["AFFERİM", "ADAMIN DİBİSİN", "ERAY'DAN RT'Yİ KAPTIN", "SEN ADAMIN DİBİSİN (Y)", "KOMİK DEĞİLDİ ZATEN"];
    //
    var data = JSON.parse(e.detail);
    if(data.url === "/i/tweet/favorite") {
      notifyMe(favorite_messages[Math.floor((Math.random() * (favorite_messages.length - 1)) + 0)]);
    } else if(data.url === "/i/tweet/unfavorite") {
      notifyMe(unfavorite_messages[Math.floor((Math.random() * (unfavorite_messages.length - 1)) + 0)]);
    }
  });
});

