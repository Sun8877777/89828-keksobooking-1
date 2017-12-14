'use strict';
window.createPin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGH = 40;
  var pinFragment = document.createDocumentFragment();
  var buttonPin;
  var imagePin;
  for (var i = 0; i < window.getData().length; i++) {
    buttonPin = document.createElement('button');
    buttonPin.classList.add('map__pin');
    buttonPin.setAttribute('data-num', i);
    buttonPin.setAttribute('tabinex', '0');
    buttonPin.style.cssText = 'left: ' + window.getData()[i].location.x + 'px; top: ' + window.getData()[i].location.y + 'px;';
    imagePin = document.createElement('img');
    imagePin.setAttribute('src', window.getData()[i].author.avatar);
    imagePin.setAttribute('width', PIN_WIDTH);
    imagePin.setAttribute('height', PIN_HEIGH);
    imagePin.setAttribute('draggable', false);
    buttonPin.appendChild(imagePin);
    pinFragment.appendChild(buttonPin);
  }
  return pinFragment;
})();
