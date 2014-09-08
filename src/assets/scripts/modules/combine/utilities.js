/**
 * @file Utilities module
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var ff = ff ? ff : {};
(function ($) {
	$.extend(ff, {
    /**
    * Utility methods.
    * @namespace Utilities
    */
    utilities: {
      ff: null,
      setGlobal: function () {
        var self = this;

        self.ff = ff;
      },
      /**
      * Gets parameters from a query string.
      * @function getUrlParams
      * @memberof Utilities
      * @param {string} queryString
      * @returns {object} params
      */
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
      /**
      * Sets parameters in a query string.
      * @function setUrlParams
      * @memberof Utilities
      */
      setUrlParams: function () {
        var self = this;

        self.ff.settings.urlParams = self.getUrlParams(window.location.search);
      },
      /**
      * Safer and enhanced console.log()
      * @function log
      * @memberof Utilities
      * @param {string} content
      */
      log: function (content) {
        if (typeof(console) !== 'undefined') {
          console.log(content);
        }
      },
      /**
      * Encodes an HTML string
      * @function htmlEncode
      * @memberof Utilities
      * @param {string} value
      * @returns {string}
      */
      htmlEncode: function (value) {
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
      htmlDecode: function (value) {
        if (value) {
          return $('<div />').html(value).text();
        } else {
          return '';
        }
      }
    }
	});
  $.subscribe('setGlobal', function (event, ff) {
    ff.utilities.setGlobal(ff);
  });
}(jQuery));
