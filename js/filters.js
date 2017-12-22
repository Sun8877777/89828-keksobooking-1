'use strict';
(function () {
  var ANY_VALUE = 'any';

  var pricesData = {
    low: {
      NUMBER: 10000,
      VALUE: 'low'
    },
    high: {
      NUMBER: 50000,
      VALUE: 'high'
    }
  };

  var typeFilter = document.querySelector('#housing_type');
  var priceFilter = document.querySelector('#housing_price');
  var roomsFilter = document.querySelector('#housing_room-number');
  var guestsFilter = document.querySelector('#housing_guests-number');
  var featuresFilter = document.querySelector('#housing_features');

  var filtrateFunctions = [
    function (notice) {
      return (typeFilter.value === notice.offer.type) || (typeFilter.value === ANY_VALUE);
    },
    function (notice) {
      switch (priceFilter.value) {
        case pricesData.low.VALUE:
          return notice.offer.price < pricesData.low.NUMBER;
        case pricesData.high.VALUE:
          return notice.offer.price > pricesData.high.NUMBER;
        case ANY_VALUE:
          return true;
        default:
          return notice.offer.price >= pricesData.low.NUMBER && notice.offer.price <= pricesData.high.NUMBER;
      }
    },
    function (notice) {
      return (roomsFilter.value === notice.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
    },
    function (notice) {
      return (guestsFilter.value === notice.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
    },
    function (notice) {
      var checkedElements = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return notice.offer.features.includes(currentFeature);
      });
    }
  ];

  // исходный массив
  var getFiltratedAdvertisements = function (notices) {
    return notices.filter(function (notice) {
      return filtrateFunctions.every(function (currentFunction) {
        return currentFunction(notice);
      });
    });
  };

  window.activateFilters = function (notices) {
    var redrawPins = function () {
      window.pin.update(getFiltratedAdvertisements(notices));
    };

    var filterChangeHandler = function () {
      window.debounce(redrawPins);
    };

    typeFilter.addEventListener('change', filterChangeHandler);
    priceFilter.addEventListener('change', filterChangeHandler);
    roomsFilter.addEventListener('change', filterChangeHandler);
    guestsFilter.addEventListener('change', filterChangeHandler);
    featuresFilter.addEventListener('change', filterChangeHandler, true);
  };
})();
