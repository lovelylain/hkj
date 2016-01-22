## 如何使用
将以下代码保存书签，在视频页面点击书签；或者[安装UserScript脚本](http://lovelylain.github.io/hkj/)

```
javascript:(function(w,d){var URL=d.URL;var inject=function(f){var s=document.createElement('script');s.src=f;(document.head||document.documentElement).appendChild(s);s.parentNode.removeChild(s)};var hkjs=[/^https?:\/\/(?:www\.acfun\.(?:com|tv)|acfun\.tudou\.com)\/v\/a/,function(){inject('http://lovelylain.github.io/hkj/assets/acfun.js')},/^https?:\/\/(?:www\.bilibili\.(?:com|tv)|bilibili\.kankanews\.com)\/video\/a/,function(){inject('http://lovelylain.github.io/hkj/assets/bilibili.js')}];for(var i=0;i<hkjs.length;i+=2){if(hkjs[i].test(URL)){hkjs[i+1]();break;}}})(window,document)
```
