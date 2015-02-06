/**
 * @module helper
 * author : Eray Arslan <relfishere@gmail.com>
 *
 * twitter action handler chrome plugin _\o.o/_
 */

var name = "fav-kyou";
var message_storage_url = "https://gist.githubusercontent.com/erayarslan/fa06bf20996d3a843abf/raw/fav_kyou_storage.json";
var favorite_messages, unfavorite_messages, retweet_messages, unretweet_messages;

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

var loadMessages = function() {
  $.getJSON(message_storage_url, function(data) {
    favorite_messages = data.favorite_messages;
    unfavorite_messages = data.unfavorite_messages;
    retweet_messages = data.retweet_messages;
    unretweet_messages = data.unretweet_messages;
  });
};

var injectScript = function (script) {
  var injectedScript = document.createElement('script');
  injectedScript.type = 'text/javascript';
  injectedScript.text = '(' + script + ')("");';
  document.body.appendChild(injectedScript);
};

var random = function (from, to) {
  return Math.floor((Math.random() * (to)) + from);
};

var getParameterByName = function (name, url) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

var doFavkYou = function (url, data) {
  if (url === "/i/tweet/favorite") {
    notify(favorite_messages[random(0, favorite_messages.length)]);
  } else if (url === "/i/tweet/unfavorite") {
    notify(unfavorite_messages[random(0, unfavorite_messages.length)]);
  } else if (url === "/i/tweet/retweet") {
    notify(retweet_messages[random(0, retweet_messages.length)]);
  } else if (url === "/i/tweet/unretweet") {
    notify(unretweet_messages[random(0, unretweet_messages.length)]);
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
  loadMessages();
  checkNotificationAccess();
  injectScript(trick);
  addListener();
});

