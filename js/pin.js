'use strict';
(function () {
  window.createPin = function (data) {
    var PIN_WIDTH = 40;
    var PIN_HEIGH = 40;
    var pinFragment = document.createDocumentFragment();
    var buttonPin;
    var imagePin;
    for (var i = 0; i < data.length; i++) {
      buttonPin = document.createElement('button');
      buttonPin.classList.add('map__pin');
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
    return pinFragment;
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(window.createPin, errorHandler);
})();

