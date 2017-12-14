'use strict';
window.createPin = (function () {
  var pinFragment = document.createDocumentFragment();
  var buttonPin;
  var imagePin;
  for (var i = 0; i < window.data.ads.length; i++) {
    buttonPin = document.createElement('button');
    buttonPin.classList.add('map__pin');
    buttonPin.setAttribute('data-num', i);
    buttonPin.setAttribute('tabinex', '0');
    buttonPin.style.cssText = 'left: ' + window.data.ads[i].location.x + 'px; top: ' + window.data.ads[i].location.y + 'px;';
    imagePin = document.createElement('img');
    imagePin.setAttribute('src', window.data.ads[i].author.avatar);
    imagePin.setAttribute('width', window.data.PIN_WIDTH);
    imagePin.setAttribute('height', window.data.PIN_HEIGH);
    imagePin.setAttribute('draggable', false);
    buttonPin.appendChild(imagePin);
    pinFragment.appendChild(buttonPin);
  }
  return pinFragment;
})();
