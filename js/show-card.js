'use strict';
window.showCard = (function () {
  var mainMap = document.querySelector('.map');
  var pinMapFilter = mainMap.querySelector('.map__filters-container');
  var pinMapContainer = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;

  var onPopupClose = function () {
    var el = document.querySelector('.map__card');
    var buttonClose = el.querySelector('.popup__close');
    el.classList.add('hidden');
    window.deactivatePin(pinMapContainer);
    buttonClose.removeEventListener('click', onPopupClose);
  };

  var onKeyEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      onPopupClose();
      document.removeEventListener('keydown', onKeyEscPress);
    }
  };

  return function (number) {
    var panel = window.createElemDialogPanel(window.getData()[number]);
    mainMap.insertBefore(panel, pinMapFilter);
    var closeCardPanel = document.querySelector('.map__card');
    var buttonClose = closeCardPanel.querySelector('.popup__close');
    buttonClose.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onKeyEscPress);
  };

  // return renderControlPanel(number);
})();
