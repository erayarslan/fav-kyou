/**
 * @module back
 * author : Eray Arslan <relfishere@gmail.com>
 *
 * twitter action handler chrome plugin _\o.o/_
 */

var plugin_messages = [
  "_\\o.o//_",
  "İYİYİZ YA SAĞOL",
  "BURDAYIZ BURDAYIZ",
  "MERAK ETMEEE :*",
  "SÜPERİZ (Y)",
  "İHİHİHİ"
];

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.notifications.create("", {
    title: "fav-kyou",
    message: plugin_messages[Math.floor((Math.random() * (plugin_messages.length)) + 0)],
    type: "basic",
    iconUrl: "../assert/icon128.png"
  }, function() {});
});