/**
 * @file Home module.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var ff = ff ? ff : {};
(function($) {
	$.extend(ff, {
		/**
		 * Homepage related methods.
		 * @namespace home
		 */
		home: {
			// CSS selectors
			firstListItemSelector: '.homepage__list-item.in',
			listItemInClass: 'in',
			listItemOutClass: 'out',
			listItemGoneClass: 'gone',
			/**
			 * Initialises Home module.
			 * @function init
			 * @memberof Blog
			 */
			init: function() {
				var self = this;

				self.bindEvents();
			},
			/**
			 * Binds all homepage module events.
			 * @function bindEvents
			 * @memberof home
			 */
			bindEvents: function() {
				var self = this;

				var $li = $(self.firstListItemSelector);

				var interval = setInterval(function() {
					if (!$li.is(':last-child')) {
						$li.toggleClass(self.listItemInClass + ' ' + self.listItemOutClass);

						var timeout = setTimeout(function() {
							$li.addClass(self.listItemGoneClass);

							$li = $li.next();
							$li.addClass(self.listItemInClass);

							clearTimeout(timeout);
						}, 250);
					} else {
						clearInterval(interval);
					}
				}, 2000);

			}
		}
	});
	$.subscribe('pageReady', function() {
		ff.home.init();
	});
}(jQuery));
