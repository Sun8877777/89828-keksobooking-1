'use strict';
(function () {
  window.createPin = function (data) {
    var PIN_WIDTH = 40;
    var PIN_HEIGH = 40;
    var TOTAL_ADS = 8;
    var pinMapContainer = document.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();
    var buttonPin;
    var imagePin;
    for (var i = 0; i < TOTAL_ADS; i++) {
      buttonPin = document.createElement('button');
      buttonPin.classList.add('map__pin');
      buttonPin.classList.add('hidden');
      buttonPin.setAttribute('data-num', i);
      buttonPin.setAttribute('tabinex', '0');
      buttonPin.style.cssText = 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;';
      imagePin = document.createElement('img');
      imagePin.setAttribute('src', data[i].author.avatar);
      imagePin.setAttribute('width', PIN_WIDTH);
      imagePin.setAttribute('height', PIN_HEIGH);
      imagePin.setAttribute('draggable', false);
      buttonPin.appendChild(imagePin);
      pinFragment.appendChild(buttonPin);
    }
    // return pinFragment;
    pinMapContainer.appendChild(pinFragment);
  };
  window.backend.load(window.createPin, window.errorHandler);
})();

