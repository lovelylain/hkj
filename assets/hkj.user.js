//
// @author		lovelylain
// @version		0.2
//
// ==UserScript==
// @name		HeiKeJi
// @namespace	https://github.com/lovelylain/hkj
// @description	UserScript for HeiKeJi
// @include		*
// ==UserScript==

(function(w, d){
	var URL = d.URL, i;
	var run = function(f) {
		w.jQuery ? f(w.jQuery) : GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://cdn.staticfile.org/jquery/1.10.2/jquery.min.js',
			onload: function(r) {eval(r.responseText); f(w.jQuery)}
		})
	}
	var inject = function(f) {
		var script = document.createElement('script');
		script.textContent = '(' + f + ')();';
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
	}
	var click = function(o) {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent('click', true, true);
		click = function(o) {o.dispatchEvent(clickEvent)};
		click(o);
	}

	var hkjs = [
		/^https?:\/\/(?:www\.acfun\.(?:com|tv)|acfun\.tudou\.com)\/v\/a/,
		function($) {$.getScript('http://lovelylain.github.io/hkj/assets/acfun.js')},

		/^https?:\/\/(?:www\.bilibili\.(?:com|tv)|bilibili\.kankanews\.com)\/video\/a/,
		function($) {$.getScript('http://lovelylain.github.io/hkj/assets/bilibili.js')},

		/^https?:\/\/www\.newsmth\.net\/bbst?con.php\?/,
		function($) {
			var url = d.location.pathname;
			if (url === '/bbscon.php') { //返回版面
				url = $('#idConOper a:contains(\u8fd4\u56de\u7248\u9762):first');
			} else if (url === '/bbstcon.php') { //进入讨论区
				url = $('div.tconPager a:contains(\u8fdb\u5165\u8ba8\u8bba\u533a):first');
			}
			url = url.length && url[0].href;
			url && $('div.conPager,div.tconPager').each(function() {
				var div = $(this);
				var pattern = /\[\u5206\u4eab\u5230 <a.*\u5fae\u535a<\/a>\]/;
				var link = ' [<a href="' + url + '&ftype=0">\u8fd4\u56de\u4e00\u822c</a>] [<a href="' +
							url + '&ftype=6">\u8fd4\u56de\u4e3b\u9898</a>]';
				// var pattern = /\[分享到 <a.*微博<\/a>\]/;
				// var link = ' [<a href="' + url +'&ftype=0">返回一般</a>] [<a href="' + url +'&ftype=6">返回主题</a>]';
				div.html(div.html().replace(pattern, link));
			});
		},

		/^https?:\/\/bbs\.whnet\.edu\.cn\/cgi-bin\//,
		function($) {
			var pagename = d.location.pathname.substring(9).toLowerCase();
			if (pagename === 'bbsfoot') {
				$('#bbsfoot').append(' ').append($('<a href="http://t.qq.com/HUSTer" target="_blank">\u817e\u8baf\u5fae\u535a</a>' //腾讯微博
				+ ' <a href="/xml/posttop10.xml">\u767d\u4e91\u5341\u5927</a>' //白云十大
				+ ' <a href="http://zhairenju.appspot.com/byhh.xml"><img border="0" align="absmiddle" src="/style/blue/images/rss.gif" alt="\u5341\u5927RSS" title="\u8ba2\u9605\u5341\u5927"/></a>' //订阅十大RSS
				));
			} else if (pagename === 'bbscon') {
				inject(function(){
					// 修正newhost.byhh.net的链接
					$(function() {
						$('a[@href*="newhost.byhh.net"]').each(function() {
							this.href = UrlEncode(decodeURI(this.href));
						});
						$('img[@src*="newhost.byhh.net"]').each(function() {
							this.src = UrlEncode(decodeURI(this.src));
						});
					});

					// 添加“从此处展开”
					var tid = /board=\w+&file=M\.\d+\.A/i.exec($('#main #link a')[0]);
					if (tid) {
						var ilink = '[<a href="bbstcon?' + tid + '">\u4ece\u6b64\u5904\u5c55\u5f00</a>]'; //'">从此处展开</a>]'
						$('#main #link').append(ilink);
					}
				});
			} else if (pagename == 'bbstcon') {
				inject(function(){
					// 修正newhost.byhh.net的链接
					$(function() {
						$('a[@href*="newhost.byhh.net"]').each(function() {
							this.href = UrlEncode(decodeURI(this.href));
						});
						$('img[@src*="newhost.byhh.net"]').each(function() {
							this.src = UrlEncode(decodeURI(this.src));
						});
					});

					// 添加“返回一般”、“返回主题”链接
					$('#main .tdarticle pre').each(function() {
						var content = $(this).html();
						var tid = /board=(\w+)&amp;.*?start=(\d+)/.exec(content);
						if (tid) {
							content = content.split('>\u672c\u7bc7\u5168\u6587</a>]'); //'>本篇全文</a>]');
							if (content.length == 2) {
								var ilink = '>\u672c\u7bc7\u5168\u6587</a>] [<a href="bbsdoc?board=' + tid[1] + '&start=' + tid[2] + '">\u8fd4\u56de\u4e00\u822c</a>] ';
								ilink += '[<a href="bbstdoc?board=' + tid[1] + '&start=' + tid[2] + '">\u8fd4\u56de\u4e3b\u9898</a>]';
								//var ilink = '>本篇全文</a>] [<a href="bbsdoc?board=' + tid[1] + '&start=' + tid[2] +'">返回一般</a>] ';
								//ilink += '[<a href="bbstdoc?board=' + tid[1] + '&start=' + tid[2] +'">返回主题</a>]';
								$(this).html(content[0] + ilink + content[1]);
							}
						}
					});
				});
			}
		}
	];

	for (i = 0; i < hkjs.length; i+=2) {
		if (hkjs[i].test(URL)) {run(hkjs[i+1]); break;}
	}
})(window, document);
