(function(window){
  'use strict';
  var App = window.App || {};
  var data = {};
  function DataStore() {

  }

  DataStore.prototype.add = function (key, val) {
      data[key] = val;
  };

  DataStore.prototype.get = function (key) {
    return data[key];
  };

  DataStore.prototype.getAll = function () {
    return data;
  };

  DataStore.prototype.remove = function (key) {
    delete data[key];
  };

  App.DataStore = DataStore; //create a new DataStore and assign it
  window.App = App;

})(window);
