/**
 * @file Utilities module
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
    /**
    * Utility methods.
    * @namespace Utilities
    */
    utilities: {
      bb: null,
      setGlobal: function () {
        var self = this;

        self.bb = bb;
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

        self.bb.settings.urlParams = self.getUrlParams(window.location.search);
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
  $.subscribe('setGlobal', function (event, bb) {
    bb.utilities.setGlobal(bb);
  });
}(jQuery));
