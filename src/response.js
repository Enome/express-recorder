var extend = require('underscore').extend;

module.exports = function (state, callback) {

  var result = {};

  // This ends the response
  
  var callCallback = function () {
    callback && callback();
  };

  var response = {

    locals: (function () {

      // Setup locals

      if (typeof state !== 'undefined' && typeof state.locals !== 'undefined') {
        return state.locals;
      }

      return {};

    }()),

    render: function (view, locals) {

      result.render = view;

      // Set locals

      if (typeof locals !== 'undefined') {
        extend(response.locals, locals);
      }

      callCallback();
    },

    send: function (text) {
      result.send = text;
      callCallback();
    },

    json: function (obj) {
      result.json = obj;
      callCallback();
    },

    redirect: function (url) {
      result.redirect = url;
      callCallback();
    },

    header: function (key, value) {
      if (!result.headers) {
        result.headers = {};
      }
      result.headers[key] = value;
    },

    cookie: function (key, value) {
      if (!result.cookie) {
        result.cookies = {};
      }
      result.cookies[key] = value;
    },

    end: function () {

      if (Object.keys(response.locals).length !== 0) {
        result.locals = response.locals;
      }

      return result;
    }

  };

  return response;

};
