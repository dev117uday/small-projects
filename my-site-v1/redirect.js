

detectmob();
function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i) )
    {
        window.location.href = "http://dev117uday.github.io/m_site/mobile_site/";
     }
    else {
        window.location.href = "http://dev117uday.github.io/m_site/desktop_site.html";
     }
   }

