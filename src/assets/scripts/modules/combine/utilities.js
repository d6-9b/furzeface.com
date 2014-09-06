var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		getUrlParams: function (queryString) {
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
		setUrlParams: function () {
			var self = this;
			self.settings.urlParams = self.getUrlParams(window.location.search);
		},
		// use for debugging/logging
		log: function (content) {
			if (typeof(console) !== 'undefined') {
				console.log(content);
			}
		},
		htmlEncode: function (value) {
			if (value) {
				return $('<div />').text(value).html();
			} else {
				return '';
			}
		},
		htmlDecode: function (value) {
			if (value) {
				return $('<div />').html(value).text();
			} else {
				return '';
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.setUrlParams();
	});
}(jQuery));
