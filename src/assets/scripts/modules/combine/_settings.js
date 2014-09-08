var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		settings: {
			// Cache some common jQuery objects
			$window: $(window),
			$html: $('html'),
      $head: $('head'),
			$body: $('body'),
			$htmlbody: $('html,body'),
			$page: $('#page'),
			$header: $('#header'),
			$main: $('#main'),
			$footer: $('#footer'),
			// Stored URL params (empty to begin with)
			urlParams: {}
		}
	});
}(jQuery));
