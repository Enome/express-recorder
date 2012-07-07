var _ = require('underscore');

module.exports = function (state) {

  var request = {

    session: {

      destroy: function (key) {

        delete this[key];

      }
    
    },

    end: function () {

      var result = {};

      delete request.session.destroy;

      if (!_.isEmpty(request.session)) {
        result.session =  request.session;
      }

      return result;

    },

    param: function (key) {

      return state.params[key];

    },


    header: function (key) {
      return state.headers[key];
    },

    get : this.header
  
  };

  if (state) {

    if (state.body) {

      request.body = state.body;

    }

    if (state.session) {

      _.extend(request.session, state.session);

    }

    if (state.query) {

      request.query = state.query;

    }

    if (state.params) {

      request.params = state.params;

    }

    if (state.cookies) {

      request.cookies = state.cookies;

    }

    if (state.request) {

      _.extend(request, state.request);

    }

    if (state.headers) {

      request.headers = state.headers;

    }

  }

  return request;

};
