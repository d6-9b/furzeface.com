/**
 * @file Returns contents of block if they exist.
 * @version 1.0.0
 * @author {@link http://github.com/spacedawwwg Paul Welsh}
 */

 module.exports.register = function (Handlebars, options, params)  {
  /**
  * Handlebars helpers.
  * @namespace Handlebars.helpers
  */
  Handlebars.registerHelper('if_block', function (names, options) {
    this.blocks = this.blocks || {};
    names = names.split('|');
    for(var i=0; i < names.length; i++) {
      var name = names[i].trim(),
      block = this.blocks[name];
      if (block) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  });
};
