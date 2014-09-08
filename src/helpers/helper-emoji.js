/**
 * @file Returns an emoji for within posts.
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

 module.exports.register = function (Handlebars, options, params)  {
  /**
  * Handlebars helpers.
  * @namespace Handlebars.helpers
  */
  Handlebars.registerHelper('emoji', function (emoji, options) {
    /**
    * Return an <html> emoji.
    * @function emoji
    * @memberof Handlebars.helpers
    * @param {string} emoji - emoji name
    * @example
    * // returns <span class="emoji">:grimacing:</span>
    * Handlebars.helpers.emoji(grimacing);
    * @returns {string} html
    * @see {@link https://github.com/linyows/jquery-emoji}
    * @see {@link http://www.emoji-cheat-sheet.com}
    */
    var html = [];

    html.push('<span class="emoji">:' + emoji + ':</span>');

    return new Handlebars.SafeString(html.join(''));
  });
};
