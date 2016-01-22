/*!
 * Licensed under MIT
 */
(function() {
	if ($('#acfun-helper').length || system.type != 'video') return;

	system.func.swapPlayer = function() {
		if ($('div#ACFlashPlayer-re').length) {
			$.info('info::播放器已替换');
			return;
		}
		var sourceAlias = {'qq2':'qq', 'youku2':'youku'};
		var notSupports = ['iqiyi', 'letv', 'zhuzhan'];
		var sourceNames = {
			'qq': '腾讯视频',
			'iqiyi': '爱奇艺',
			'youku': '优酷网',
			'tudou': '土豆网',
			'letv': '乐视云',
			'letv2': '乐视网',
			'sohu': '搜狐视频',
			'sina': '新浪视频',
			'pps': 'PPS.tv',
			'pptv': 'PPTV',
			'ku6': '酷六网',
			'56': '56网',
			'zhuzhan': '主站'
		};
		var v = $('#area-part-view a.btn.active:eq(0)').data();
		var from = sourceAlias[v.from];
		if (!from) from = v.from;
		var name = sourceNames[from];
		if (!name || $.inArray(from, notSupports) !== -1) {
			$.info('error::不支持此视频源：' +from+ (name ? '('+name+')' : ''));
			return;
		}
		var swf = 'http://lovelylain.github.io/hkj/assets/AcPlayer201412121_D.swf';
		var param = 'oldcs=1&host=http://www.acfun.tv&vid=' + v.vid;
		$('#ACFlashPlayer-re').prop('outerHTML', '<div id="ACFlashPlayer-re"><object type="application/x-shockwave-flash" allowfullscreeninteractive="true" allowfullscreen="true" allowscriptaccess="always" data="'+swf+'" style="visibility:visible;width:100%;height:100%"><param name="allowFullscreenInteractive" value="true"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="flashvars" value="'+param+'"></object></div>');
		$.info('info::替换成功，视频源：' +from+ (name ? '('+name+')' : ''));
	};

	var style = document.createElement('style');
	$(style).html('#area-toolbar-view{z-index:3 !important;}#area-toolbar-view:hover .tooltip{display:inline-block}#area-toolbar-view .icon{transition:color .5s}#area-toolbar-view .tooltip{display:none;background-color:#fff;font-family:"Microsoft Jhenghei",Helvetica,Arial,Verdana,sans-serif;color:#666;text-shadow:0 0 2px rgba(0,0,0,0.1);font-size:18px;padding:0 10px;border-left:1px solid #ddd;height:34px;border-right:1px solid #ddd;position:absolute;left:395px;}#area-toolbar-view .tooltip .icon{color:#3a9bd9}#area-toolbar-view .tooltip:hover + .config-box{display:block}#area-toolbar-view .tooltip:hover .icon{color:#95be3e}#area-toolbar-view .config-box{display:none;position:absolute;background:rgba(255,255,255,0.9);box-shadow:2px 4px 4px rgba(0,0,0,0.1);border:1px solid #ddd;top:-150px;left:395px;width:300px;height:150px;}#area-toolbar-view .config-box p,#area-toolbar-view .config-box a,#area-toolbar-view .config-box span,#area-toolbar-view .config-box label{font-family:"Microsoft Jhenghei",Helvetica,Arial,Verdana,sans-serif}#area-toolbar-view .config-box:hover{display:block}#area-toolbar-view .config-box .inner{padding:8px;}#area-toolbar-view .config-box .inner .area-btn{margin:4px 0 12px 0;text-align:center;}#area-toolbar-view .config-box .inner .area-btn .btn{float:none;font-size:18px;height:34px;line-height:32px;padding:0 12px;}#area-toolbar-view .config-box .inner .area-btn .btn:hover .icon{color:#95be3e}#area-toolbar-view .config-box .inner .area-btn .btn .icon{color:#3a9bd9}#area-toolbar-view .config-box .inner label{font-size:16px;color:#899619;display:inline-block;line-height:1.2;margin:0 30px 0 10px}#area-toolbar-view .config-box .inner input[type="checkbox"]{vertical-align:text-bottom;width:20px;box-shadow:none;height:20px;cursor:pointer}');
	$('head').append(style);
	$('#area-toolbar-view').append('<div id="acfun-helper"><a class="tooltip"><i class="icon icon-star"></i>AcFun助手</a>' +
	'<div class="config-box"><div class="inner">' +
	'<div class="area-btn"><a class="btn" myid="swap-player"><i class="icon icon-heart"></i>点击手动替换播放器</a></div>' +
	'<div><label for="auto-swap">自动替换播放器</label><input myid="auto-swap" type="checkbox"></div>' +
	'<div><label for="auto-hide">自动隐藏插件</label><input myid="auto-hide" type="checkbox"></div>' +
	'</div></div></div>');

	if (!config.plugins) config.plugins = {};
	var acHelper = config.plugins.acHelper;
	if (!acHelper) {
		config.plugins.acHelper = acHelper = {autoSwap:true, autoHide:false};
		$.save('config');
	}
	$('#acfun-helper [myid="auto-swap"]')[0].checked = acHelper.autoSwap;
	$('#acfun-helper [myid="auto-hide"]')[0].checked = acHelper.autoHide;
	if (acHelper.autoSwap) {
		if ($('object#ACFlashPlayer-re').length) {
			system.func.swapPlayer();
		} else {
			var partTimer = setInterval(function(){
				if ($('object#ACFlashPlayer-re').length) {
					system.func.swapPlayer();
					clearInterval(partTimer);
				}
			}, 500);
		}
	}
	if (!acHelper.autoHide) $('#acfun-helper .tooltip').css({display: 'inline-block'});

	$('#acfun-helper [myid="swap-player"]').on('click', function() {system.func.swapPlayer()});
	$('#acfun-helper [myid="auto-swap"]').on('change', function() {acHelper.autoSwap = this.checked; $.save('config')});
	$('#acfun-helper [myid="auto-hide"]').on('change', function() {acHelper.autoHide = this.checked; $.save('config')});
})();
