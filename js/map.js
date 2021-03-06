'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var mainMap = document.querySelector('.map');
  var pinMapContainer = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainFormPage = document.querySelector('.notice__form');
  var fieldsetMainForm = mainFormPage.querySelectorAll('fieldset');
  var plaseAddress = document.querySelector('#address');
  var pinElems;

  var disabledElemMainForm = function (elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].setAttribute('disabled', true);
    }
  };
  var enabledElemMainForm = function (elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeAttribute('disabled');
    }
  };
  var addClassTo = function (element, className) {
    return element.classList.add(className);
  };
  var removeClassFrom = function (element, className) {
    return element.classList.remove(className);
  };
  var getDataNum = function (dataNum) { // получение номера из data -атрибута
    return dataNum.getAttribute('data-num');
  };

  var removeControlPanel = function () {
    var controlPanels = mainMap.querySelectorAll('article');
    for (var i = controlPanels.length - 1; i >= 0; i--) {
      mainMap.removeChild(controlPanels[i]);
    }
  };

  window.deactivatePin = function (element) {
    var statusPin = element.querySelector('.map__pin--active');
    if (statusPin) {
      removeClassFrom(statusPin, 'map__pin--active');
      removeControlPanel();
    }
  };


  var onPinMainClick = function () {
    removeClassFrom(mainMap, 'map--faded');
    removeClassFrom(mainFormPage, 'notice__form--disabled');
    enabledElemMainForm(fieldsetMainForm);
    pinElems = pinMapContainer.querySelectorAll('.map__pin');
    for (var i = 0; i < pinElems.length; i++) {
      if (!(pinElems[i].classList.contains('map__pin--main'))) {
        pinElems[i].classList.remove('hidden');
        pinElems[i].addEventListener('mouseup', onPinClick);
        pinElems[i].addEventListener('keypress', onPinKeyEnter);
      }
    }
    mapPinMain.removeEventListener('mouseup', onPinMainClick);
  };

  var onPinClick = function (event) {
    event.preventDefault();
    var pin = event.currentTarget;
    window.deactivatePin(pinMapContainer);
    addClassTo(pin, 'map__pin--active');
    window.showCard(getDataNum(pin));
  };

  var onPinKeyEnter = function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      onPinClick(event);
    }
  };

  var loadPage = function () {
    if (mainFormPage.classList.contains === 'notice__form--disabled') {
      disabledElemMainForm(fieldsetMainForm);
    } else {
      addClassTo(mainFormPage, '.notice__form--disabled');
      disabledElemMainForm(fieldsetMainForm);
    }
  };
  // module5 task2
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientY > 100 && moveEvt.clientY < 500) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var adddress = ['x: ' + upEvt.clientX, 'y: ' + upEvt.clientY];
      plaseAddress.value = adddress.join(', ');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  loadPage();
  mapPinMain.addEventListener('mouseup', onPinMainClick);
})();
