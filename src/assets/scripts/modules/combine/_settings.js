var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		settings: {
			// cache some common variables
			$window: $(window),
			$html: $('html'),
			$body: $('body'),
			$htmlbody: $('html,body'),
			$page: $('#page'),
			$header: $('#header'),
			$main: $('#main'),
			$footer: $('#footer'),
			// stored URL params (empty to begin with)
			urlParams: {}
		}
	});
}(jQuery));
