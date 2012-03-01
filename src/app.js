var _ = require('underscore');

module.exports = function(){
  
  var routes = {};

  var setRoute = function(type, url){

    if( _.isUndefined( routes[type] ) ){
      routes[type] = {};
    };

    routes[type][url] = _.rest(arguments, 2);

  };

  return {

    routes: routes,

    get: setRoute.bind(null, 'get'),
    post: setRoute.bind(null, 'post'),
    put: setRoute.bind(null, 'put'),
    delete: setRoute.bind(null, 'delete')

  };

};
