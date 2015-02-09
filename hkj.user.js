//
// @author		lovelylain
// @version		0.1
//
// ==UserScript==
// @name		HeiKeJi
// @namespace	https://github.com/lovelylain/hkj
// @description	UserScript for HeiKeJi
// @include		*
// ==UserScript==

(function(w, u) {
	(function(f) {
		f && (w.jQuery ? f(w.jQuery) : GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://cdn.staticfile.org/jquery/1.10.2/jquery.min.js',
			onload: function(r) {
				eval(r.responseText);
				f(w.jQuery)
			}
		}))
	})(/^https?:\/\/www\.acfun\.(?:com|tv)\/v\//.test(u) &&
	function($) {
		$.getScript('https://raw.githubusercontent.com/lovelylain/hkj/43be584c27eb36de50e86decb2ae64acfcd433d9/acfun.js')
	} || /^https?:\/\/(?:www\.bilibili\.(?:com|tv)|bilibili\.kankanews\.com)\/video\//.test(u) &&
	function($) {
		$.getScript('http://keyfunc.github.io/bilibili_hkj/assets/js/heikeji.min.js')
	})
})(window, window.location);