# Bilibili黑科技

## 如何使用
```
将以下代码保存书签，在视频页面点击书签；或者安装下述UserScript脚本
```
```
javascript:(function(u){if(/^https?:\/\/(?:www\.bilibili\.(?:com|tv)|bilibili\.kankanews\.com)\/video\//.test(u))(function(r){!!r?r():(function(d){var s=d.createElement('script');s.setAttribute('src','http://keyfunc.github.io/bilibili_hkj/assets/js/heikeji.min.js');s.setAttribute('charset','utf-8');d.getElementsByTagName('head')[0].appendChild(s)})(document)})(window.bilibili_hkj);else if(/^https?:\/\/www\.acfun\.(?:com|tv)\/v\//.test(u))$.getScript('https://raw.githubusercontent.com/lovelylain/hkj/43be584c27eb36de50e86decb2ae64acfcd433d9/acfun.js'+$.salt())})(window.location)
```

## 文件说明
* [hkj.user.js](https://raw.githubusercontent.com/lovelylain/hkj/master/hkj.user.js): UserScript脚本，自动加载Bilibili黑科技
* bilibili.js: [Bilibili黑科技](http://keyfunc.github.io/bilibili_hkj/)备份防不测，暂未用到
