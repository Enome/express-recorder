var _ = require('underscore');

module.exports = function(state, callback){

  var result = {};

  if( !_.isUndefined(state) && !_.isUndefined(state.locals) ){

    result.locals = state.locals;

  };

  // This ends the response
  
  var callCallback = function(){

    if(!_.isUndefined(callback)) callback()

  };

  return {

    locals: function(){

      return result.locals

    },

    local: function(key, value){

      if( _.isUndefined(result.locals) ){

        result.locals = {};

      };

      result.locals[key] = value;

    },

    render: function(view, locals){
      result.render = view

      if(!_.isUndefined(locals)){
        for( var k in locals){
          this.local(k, locals[k]);
        };
      };

      callCallback()
    },

    send: function(text){
      result.send = text;
      callCallback()
    },

    redirect: function(url){
      result.redirect = url;
      callCallback()
    },

    header: function(key, value){
      if(!result.headers){
        result.headers = {};
      };
      result.headers[key] = value;
    },

    cookie: function(key, value){
      if(!result.cookie){
        result.cookies = {};
      };
      result.cookies[key] = value;
    },

    end: function(){ 
      return result; 
    }

  }

};
