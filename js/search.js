  // enter
  window.onload = function() {
    document.onkeydown = function(ev) {
      var event = ev || event
      if (event.keyCode == 13) {
        search()
      }
    }
  }

  // search
  function search() {
    key = document.getElementById("search-key").value;
    if (key === "") {
      return;
    }
    document.getElementById("search-key").value = "";

    // tip
    document.getElementById("search-tip").innerText = "搜索中，请稍后 ...";
    document.getElementById("search-tip").style.display = "block";

    // clear
    var el = document.getElementById('result');
    var childs = el.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
      el.removeChild(childs[i]);
    }

    // xml
    xmltext = new XMLHttpRequest;
    xmltext.open("GET", "/index.xml", false);
    xmltext.send();
    resp = xmltext.responseXML;
    items = resp.getElementsByTagName("item");
    // search
    var i = 0;
    haveResult = false;
    while (i < items.length) {
      txt = items[i].getElementsByTagName("title")[0].innerHTML + items[i].getElementsByTagName("description")[0].innerHTML
      if (txt.toLowerCase().indexOf(key.toLowerCase()) > -1) {
        haveResult = true;
        title = items[i].getElementsByTagName("title")[0].innerHTML;
        link = items[i].getElementsByTagName("link")[0].innerHTML;
        time = items[i].getElementsByTagName("pubDate")[0].innerHTML;
        mark = items[i].getElementsByTagName("description")[0].innerHTML;
        addItem(title, link, time, mark)
      }
      i++;
    }
    if (!haveResult) {
      document.getElementById("search-tip").innerText = "搜索完毕，未发现结果 ...";
      document.getElementById("search-tip").style.display = "block";
    }
  }

  // add
  function addItem(title, link, time, mark) {
    document.getElementById("search-tip").style.display = "none";
    tmpl = "<article class=\"post\" style=\"border-bottom: 1px solid #e6e6e6;\" >" +
      "<header class=\"post-header\">" +
      "<h1 class=\"post-title\"><a class=\"post-link\" href=\"" + link + "\" target=\"_blank\">" + title + "</a></h1>" +
      "<div class=\"post-meta\">" +
      " <span class=\"post-time\">" + time + "</span>" +
      "</div>" +
      " </header>" +
      "<div class=\"post-content\">" +
      "<div class=\"post-summary\">" + mark + "</div>" +
      "<div class=\"read-more\">" +
      "<a href=\"" + link + "\" class=\"read-more-link\" target=\"_blank\">阅读更多</a>" +
      "</div>" +
      " </div>" +
      "</article>"
    div = document.createElement("div")
    div.innerHTML = tmpl;
    document.getElementById('result').appendChild(div)
  }
