module.exports = function (end) {

  var result = {};

  var next = function (err) {

    if (typeof err === 'undefined') {
      result.next = true;
    } else {
      result.next = err;
    }

    end && end();

  };

  next.end = function () {
    return result;
  };

  return next;

};
