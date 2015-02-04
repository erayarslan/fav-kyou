/**
 * @module helper
 * author : Eray Arslan <relfishere@gmail.com>
 *
 * twitter action handler chrome plugin _\o.o/_
 */

var name = "fav-kyou";
//
var favorite_messages = [
  "YAPMA",
  "OLDU MU ŞİMDİ BU?",
  "ERAY KÜFÜR EDİYOR, HATIRLA!",
  "HOŞ MU?",
  "KOMİK Mİ ŞİMDİ BU?"
];
//
var unfavorite_messages = [
  "AFFERİM",
  "ADAMIN DİBİSİN",
  "ERAY'DAN RT'Yİ KAPTIN",
  "SEN ADAMIN DİBİSİN (Y)",
  "KOMİK DEĞİLDİ ZATEN"
];
//
var retweet_messages = [
  "DOĞRU YOLDASIN (Y)",
  "CANINI YİRİM",
  "GOL OLUR",
  "LAZIM OLUR KESİN DURSUN BU"
];
//
var unretweet_messages = [
  "_\\o.o//_",
  "BU FARKMAZ",
  "KEYFİN BİLİR",
  "ÜZÜLMESİN?",
  "AMAAAN İYİ YAPTIN",
  "YA LAZIM OLURSA?",
  "MUV BİÇ GEDAVDI VEY"
];

var checkNotificationAccess = function () {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
};

var notify = function (message) {
  new Notification(name, {
    icon: 'https://raw.githubusercontent.com/erayarslan/fav-kyou/master/assert/icon128.png',
    body: message
  });
};

var trick = function () {
  $(document).ajaxComplete(function (event, request, settings) {
    document.body.dispatchEvent(
      new CustomEvent('trick', {
        detail: JSON.stringify(settings)
      })
    );
  });
};

var injectScript = function () {
  var injectedScript = document.createElement('script');
  injectedScript.type = 'text/javascript';
  injectedScript.text = '(' + trick + ')("");';
  document.body.appendChild(injectedScript);
};

var random = function (from, to) {
  return Math.floor((Math.random() * (to - 1)) + from);
};

var getParameterByName = function (name, url) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

var doFavkYou = function (url, data) {
  if (url === "/i/tweet/favorite") {
    notify(favorite_messages[random(0, favorite_messages.length - 1)]);
  } else if (url === "/i/tweet/unfavorite") {
    notify(unfavorite_messages[random(0, unfavorite_messages.length - 1)]);
  } else if (url === "/i/tweet/retweet") {
    notify(retweet_messages[random(0, retweet_messages.length - 1)]);
  } else if (url === "/i/tweet/unretweet") {
    notify(unretweet_messages[random(0, unretweet_messages.length - 1)]);
  } else if (url === "/i/tweet/create") {
    notify(getParameterByName("status", data));
  }
};

var addListener = function () {
  document.body.addEventListener('trick', function (e) {
    var data = JSON.parse(e.detail);
    doFavkYou(data.url, data.data);
  });
};

$(document).ready(function () {
  checkNotificationAccess();
  injectScript();
  addListener();
});

