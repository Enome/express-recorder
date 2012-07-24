var eql = require('eql');
var _ = require('underscore');

module.exports = function (req, res, next) {

  var data =  _.extend({}, req.end(), res.end(), next.end());

  return {
    data: data,
    eql: function (expected) {
      eql(data, expected);
    }
  };

};
