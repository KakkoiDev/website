// Sends one GoatCounter pageview, in place of GoatCounter's own script, so no
// code loads from another origin. The endpoint comes from the script tag
// (components/Analytics.tsx).
(function () {
  var script = document.currentScript;
  var endpoint = script && script.dataset.goatcounter;
  if (!endpoint) return;
  var url =
    endpoint +
    "?" +
    new URLSearchParams({
      p: location.pathname,
      r: document.referrer,
      t: document.title,
      s: [screen.width, screen.height, window.devicePixelRatio || 1].join(","),
      // The query string, so the QR codes' ?ref=card and ?ref=phone count.
      q: location.search,
      rnd: Math.random().toString(36).slice(2, 7),
    });
  if (navigator.sendBeacon && navigator.sendBeacon(url)) return;
  new Image().src = url;
})();
