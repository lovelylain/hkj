AcFun助手 & Bilibili黑科技

## 如何使用
```
将以下代码保存书签
```
```
javascript:(function(u){if(/^https?:\/\/(?:www\.bilibili\.(?:com|tv)|bilibili\.kankanews\.com)\/video\//.test(u))(function(r){!!r?r():(function(d){var s=d.createElement('script');s.setAttribute('src','http://keyfunc.github.io/bilibili_hkj/assets/js/heikeji.min.js');s.setAttribute('charset','utf-8');d.getElementsByTagName('head')[0].appendChild(s)})(document)})(window.bilibili_hkj);else if(/^https?:\/\/www\.acfun\.(?:com|tv)\/v\//.test(u))$.getScript('https://raw.githubusercontent.com/lovelylain/hkj/master/acfun.js'+$.salt())})(window.location)
```

## 文件说明
* [hkj.user.js](https://raw.githubusercontent.com/lovelylain/hkj/master/hkj.user.js): UserScript脚本，自动加载AcFun助手 & Bilibili黑科技
* acfun.js: AcFun助手修改版，[原版](http://acnya.github.io/script.js)才用了一晚就404了，所以是基于[某备份](https://github.com/daily2432121/acnya.github.io/)修改的
* bilibili.js: [Bilibili黑科技](http://keyfunc.github.io/bilibili_hkj/)备份防不测，暂未用到
