(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if(!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if(this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
      });
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addStrengthEffect = function (inputSelector, outputSelector) {
    var inputElement = $(inputSelector);
    var outputElement = $(outputSelector);

    inputElement.on('input', function(){
      var currentValue = inputElement.val();
      outputElement.val(inputElement.val());
      if(currentValue < 30) {
        outputElement.css('color', 'green');
      }
      if(currentValue < 65 && currentValue > 30) {
        outputElement.css('color', 'yellow');
      }
      if(currentValue > 65) {
        outputElement.css('color', 'red');
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
