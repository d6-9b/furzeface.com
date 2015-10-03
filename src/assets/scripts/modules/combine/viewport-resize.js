/**
 * @file Viewport Resize
 * @version 0.6.2
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var ff = ff ? ff : {};
(function($) {
	$.extend(ff, {
		/**
		 * Reusable site resize function.
		 * @namespace viewportResize
		 */
		viewportResize: {
			// Configuration
			resizeTimeout: null,
			/**
			 * Initialises viewportResize namespaced methods
			 * @function init
			 * @memberof viewportResize
			 */
			init: function() {
				var self = this;

				ff.settings.$window.on('resize', function() {
					self.clearResizeTimeout();

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function() {
						$.publish('viewportResizeEnd');
					}, 200);
				});
			},
			/**
			 * Clears the resize timeout.
			 * @function clearResizeTimeout
			 * @memberof viewportResize
			 */
			clearResizeTimeout: function() {
				var self = this;

				if (self.resizeTimeout) {
					clearTimeout(self.resizeTimeout);
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		ff.viewportResize.init();
	});
}(jQuery));
