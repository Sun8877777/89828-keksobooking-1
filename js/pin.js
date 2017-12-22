'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGH = 40;
  var TOTAL_ADS = 8;


  window.initPin = function () {
    var filtersForm = document.querySelector('.map__filters');
    filtersForm.addEventListener('change', getFilteredPins);
    renderPins(window.getFullData());
  };

  var clearPins = function() {
    var pinMapContainer = document.querySelector('.map__pins');
    pinMapContainer.innerHTML = '';

  };

  var getFilteredPins = function (evt) {
    
    //clearPins();
    var filters = {
      'housing-type': null,
      'housing-price': null,
    };


    var target = evt.target;
    var value = target.value;
    var pins = window.getFullData();


    for (var filter in filters) {
      if (target.type === 'select-one') {
        filters[filter] = value === 'any' ? null : value;
      }
    }

    var filteredData = pins.filter(function(pin) {
      for (var filter in filters) {
        var filterValue = filters[filter];
          if (filter === 'housing-type' && pin.offer.type !== filterValue) {
            return false;
          }
          if (filter === 'housing-price' && pin.offer.price !== filterValue) {
            return false;
          }
      }
      return true;
    });

    return filteredData;
  };

  var getPin = function (pin) {
    var buttonPin = document.createElement('button');
    buttonPin.classList.add('map__pin');
    buttonPin.classList.add('hidden');
    //buttonPin.setAttribute('data-num', i);
    buttonPin.setAttribute('tabinex', '0');
    buttonPin.style.cssText = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    var imagePin = document.createElement('img');
    imagePin.setAttribute('src', pin.author.avatar);
    imagePin.setAttribute('width', PIN_WIDTH);
    imagePin.setAttribute('height', PIN_HEIGH);
    imagePin.setAttribute('draggable', false);
    buttonPin.appendChild(imagePin);

    return buttonPin;
  };

  var renderPins = function (pins) {
    
    var pinMapContainer = document.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      pinFragment.appendChild(getPin(pin));
    });

    pinMapContainer.appendChild(pinFragment);

  };

})();

