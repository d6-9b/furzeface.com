var ff = ff ? ff : {};
(function ($) {
	$.extend(ff, {
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
			urlParams: {},
      // breakpoints (match _variables.scss)
      breakpointExtraSmall: parseInt('20em') * 16,
      breakpointSmall: parseInt('30em') * 16,
      breakpointMedium: parseInt('50em') * 16,
      breakpointExtraMedium: parseInt('65em') * 16,
      breakpointLarge: parseInt('80em') * 16,
      breakpointExtraLarge: parseInt('100em') * 16
		}
	});
}(jQuery));
