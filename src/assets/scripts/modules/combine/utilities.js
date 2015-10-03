/**
 * @file Utilities module
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var ff = ff ? ff : {};
(function($) {
	$.extend(ff, {
		/**
		 * Utility methods.
		 * @namespace Utilities
		 */
		utilities: {
			/**
			 * Returns a slugified string from a string
			 * @function slugify
			 * @memberof Utilities
			 * @param {string} content
			 * @returns {string} slug
			 */
			slugify: function(content) {
				var slug = content.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

				return slug;
			},
			/**
			 * Locks <html> from scrolling when an overlay is open.
			 * @function lockScroll
			 * @memberof Utilities
			 */
			lockScroll: function() {
				var self = this;
				self.unlockScroll();
				self.storedScrollPosition = ff.settings.$window.scrollTop();

				self.lockTimeout = setTimeout(function() {
					// add lock class
					ff.settings.$html.addClass('scroll-locked');
					ff.settings.$body.css({
						'top': self.storedScrollPosition * -1
					});

					clearTimeout(self.lockTimeout);
				}, 10);
			},
			/**
			 * Unlocks <html> for scrolling after an overlay has closed.
			 * @function unlockScroll
			 * @memberof Utilities
			 */
			unlockScroll: function() {
				var self = this;
				ff.settings.$html.removeClass('scroll-locked');
				ff.settings.$body.removeAttr('style');

				if (self.storedScrollPosition) {
					ff.settings.$htmlbody.scrollTop(self.storedScrollPosition);
					self.storedScrollPosition = null;
				}
			},
			/**
			 * Gets parameters from a query string.
			 * @function getUrlParams
			 * @memberof Utilities
			 * @param {string} queryString
			 * @returns {object} params
			 */
			getUrlParams: function(queryString) {
				var params = {};

				if (queryString) {
					var queryStringArray = queryString.split('&');
					for (var index in queryStringArray) {
						var query = queryStringArray[index].split('=');
						params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
					}
				}
				return params;
			},
			/**
			 * Sets parameters in a query string.
			 * @function setUrlParams
			 * @memberof Utilities
			 */
			setUrlParams: function() {
				var self = this;

				ff.settings.urlParams = self.getUrlParams();
			},
			/**
			 * Safer and enhanced console.log()
			 * @function log
			 * @memberof Utilities
			 * @param {string} content
			 */
			log: function(content, style) {
				if (typeof(console) !== 'undefined') {
					if (style) {
						console.log('%c' + content, style);
					} else {
						console.log(content);
					}
				}
			},
			/**
			 * Encodes an HTML string
			 * @function htmlEncode
			 * @memberof Utilities
			 * @param {string} value
			 * @returns {string}
			 */
			htmlEncode: function(value) {
				if (value) {
					return $('<div />').text(value).html();
				} else {
					return '';
				}
			},
			/**
			 * Decodes an HTML string
			 * @function htmlDecode
			 * @memberof Utilities
			 * @param {string} value
			 * @returns {string}
			 */
			htmlDecode: function(value) {
				if (value) {
					return $('<div />').html(value).text();
				} else {
					return '';
				}
			},
			/**
			 * Switches out SVG images to their PNG equivalent.
			 * @function svgToPng
			 * @memberof Utilities
			 * @returns {string}
			 */
			svgToPng: function() {
				if (!Modernizr.svg) {
					var $svgs = $('img[src*="svg"]');

					if (!$svgs.length) {
						return false;
					}

					$svgs.attr('src', function() {
						return $(this).attr('src').replace('.svg', '.png');
					});
				}
			}
		}
	});
}(jQuery));
