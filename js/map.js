'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var mainMap = document.querySelector('.map');
  var pinMapContainer = document.querySelector('.map__pins');
  var pinMapFilter = mainMap.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainFormPage = document.querySelector('.notice__form');
  var fieldsetMainForm = mainFormPage.querySelectorAll('fieldset');
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

  var renderControlPanel = function (number) {
    var panel = window.createElemDialogPanel(window.getData()[number]);
    mainMap.insertBefore(panel, pinMapFilter);
    var closeCardPanel = document.querySelector('.map__card');
    var buttonClose = closeCardPanel.querySelector('.popup__close');
    buttonClose.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onKeyEscPress);
  };

  var removeControlPanel = function () {
    var controlPanels = mainMap.querySelectorAll('article');
    for (var i = controlPanels.length - 1; i >= 0; i--) {
      mainMap.removeChild(controlPanels[i]);
    }
  };

  var deactivatePin = function (element) {
    var statusPin = element.querySelector('.map__pin--active');
    if (statusPin) {
      removeClassFrom(statusPin, 'map__pin--active');
      removeControlPanel();
    }
  };
  // обработчики событий
  var onPinMainClick = function () {
    removeClassFrom(mainMap, 'map--faded');
    removeClassFrom(mainFormPage, 'notice__form--disabled');
    enabledElemMainForm(fieldsetMainForm);
    pinMapContainer.appendChild(window.createPin);
    pinElems = pinMapContainer.querySelectorAll('.map__pin');
    for (var i = 0; i < pinElems.length; i++) {
      if (!(pinElems[i].classList.contains('map__pin--main'))) {
        pinElems[i].addEventListener('mouseup', onPinClick);
        pinElems[i].addEventListener('keypress', onPinKeyEnter);
      }
    }
    mapPinMain.removeEventListener('mouseup', onPinMainClick);
  };

  var onPinClick = function (event) {
    event.preventDefault();
    var pin = event.currentTarget;
    deactivatePin(pinMapContainer);
    addClassTo(pin, 'map__pin--active');
    renderControlPanel(getDataNum(pin));
  };

  var onPopupClose = function () {
    var el = document.querySelector('.map__card');
    var buttonClose = el.querySelector('.popup__close');
    el.classList.add('hidden');
    deactivatePin(pinMapContainer);
    buttonClose.removeEventListener('click', onPopupClose);
  };

  var onPinKeyEnter = function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      onPinClick(event);
    }
  };

  var onKeyEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      onPopupClose();
      document.removeEventListener('keydown', onKeyEscPress);
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
  loadPage();
  mapPinMain.addEventListener('mouseup', onPinMainClick);
})();
