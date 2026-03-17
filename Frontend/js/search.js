/* global clearText */
(function () {
  function getQueryParam(name) {
    var search = window.location.search || "";
    if (!search) return "";
    var parts = search.replace(/^\?/, "").split("&");
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].split("=");
      if (decodeURIComponent(kv[0] || "") === name) {
        return decodeURIComponent((kv[1] || "").replace(/\+/g, " "));
      }
    }
    return "";
  }

  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  // Lightweight site index (static template).
  var siteIndex = [
    {
      title: "Home",
      url: "index.html",
      content:
        "Welcome to Green Age. Download Free Templates. Online Marketing. Latest Projects.",
    },
    {
      title: "Gallery",
      url: "gallery.html",
      content:
        "Gallery. Donec eleifend ipsum. Pellentesque rhoncus. Nullam faucibus diam. Integer sit amet.",
    },
    {
      title: "News",
      url: "news.html",
      content:
        "News. Sed mollis elementum lectus rhoncus. Duis eu lectus et ante accumsan auctor. Aenean vulputate tempus sollicitudin.",
    },
    {
      title: "Blog",
      url: "blog.html",
      content:
        "Blog posts. Website templates. Illustrations. Graphics. Animations. Fusce vehicula consequat dignissim.",
    },
    {
      title: "Contact",
      url: "contact.html",
      content:
        "Contact information. Quick Contact Form. Our Location. Address. Phone and fax.",
    },
  ];

  function scoreItem(q, item) {
    var hay = normalize(item.title + " " + item.content);
    var idx = hay.indexOf(q);
    if (idx === -1) return 0;

    // Prefer title matches, then earlier matches.
    var titleHay = normalize(item.title);
    var titleIdx = titleHay.indexOf(q);
    var titleBoost = titleIdx === -1 ? 0 : 200 - Math.min(200, titleIdx);
    var posBoost = 100 - Math.min(100, idx);
    return 10 + titleBoost + posBoost;
  }

  function ensureSearchFormBehavior() {
    var form = document.getElementById("site_search_form");
    var field = document.getElementById("searchfield");
    if (!form || !field) return;

    // Populate field from query on any page.
    var q = getQueryParam("q");
    if (q) {
      field.value = q;
      try {
        field.style.color = "#333";
      } catch (e) {}
    }

    // If user submits "Search" placeholder, treat as empty.
    form.onsubmit = function () {
      var v = (field.value || "").trim();
      if (!v || v === "Search") {
        field.focus();
        return false;
      }
      return true;
    };

    // Make placeholder behave even if clearText isn't loaded (safety).
    if (typeof clearText !== "function") {
      field.onfocus = function () {
        if (field.value === "Search") field.value = "";
      };
      field.onblur = function () {
        if (!field.value) field.value = "Search";
      };
    }
  }

  function renderSearchResults() {
    var resultsEl = document.getElementById("search_results");
    var qEl = document.getElementById("search_query");
    var countEl = document.getElementById("search_count");
    if (!resultsEl) return; // Not on search page.

    var raw = (getQueryParam("q") || "").trim();
    var q = normalize(raw);
    if (qEl) qEl.innerHTML = raw ? raw : "(trống)";

    if (!q || q === normalize("Search")) {
      resultsEl.innerHTML =
        '<div class="search_empty">Nhập từ khóa ở ô Search (góc phải) để tìm.</div>';
      if (countEl) countEl.innerHTML = "0";
      return;
    }

    var scored = [];
    for (var i = 0; i < siteIndex.length; i++) {
      var s = scoreItem(q, siteIndex[i]);
      if (s > 0) scored.push({ item: siteIndex[i], score: s });
    }
    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    if (countEl) countEl.innerHTML = String(scored.length);

    if (!scored.length) {
      resultsEl.innerHTML =
        '<div class="search_empty">Không tìm thấy kết quả cho từ khóa này.</div>';
      return;
    }

    var html = ['<ul class="search_list">'];
    for (var j = 0; j < scored.length; j++) {
      var it = scored[j].item;
      html.push(
        '<li class="search_item">' +
          '<a class="search_title" href="' +
          it.url +
          '">' +
          it.title +
          "</a>" +
          '<div class="search_snippet">' +
          it.content +
          "</div>" +
          "</li>"
      );
    }
    html.push("</ul>");
    resultsEl.innerHTML = html.join("");
  }

  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 0);
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      window.attachEvent("onload", fn);
    }
  }

  onReady(function () {
    ensureSearchFormBehavior();
    renderSearchResults();
  });
})();
