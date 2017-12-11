'use strict';
var TOTAL_ADS = 8;
var DESK_OF_CONDITIONS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSING_CATEGORIES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 40;
var PIN_HEIGH = 40;
var mainMap = document.querySelector('.map');
var pinMapContainer = document.querySelector('.map__pins');
var pinMapFilter = mainMap.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var mainFormPage = document.querySelector('.notice__form');
var fieldsetMainForm = mainFormPage.querySelectorAll('fieldset');
var pinElems;
// var popupClose = document.querySelector('.popup__close');
// var mapCardPopup;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var housePhotos = [];
var ads = [];

var getRandomElementArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePin = function (numberAvatar) {
  var locationX = (getRandomNumber(300 + (PIN_WIDTH / 2), 900 - (PIN_WIDTH / 2)));
  var locationY = getRandomNumber(100 + PIN_HEIGH, 500);
  return {
    author: {
      avatar: 'img/avatars/user0' + (numberAvatar + 1) + '.png'
    },
    offer: {
      title: DESK_OF_CONDITIONS[getRandomElementArray(DESK_OF_CONDITIONS)],
      address: [locationX, locationY],
      price: getRandomNumber(1000, 1000000),
      type: getRandomElementArray(HOUSING_CATEGORIES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: OFFER_TIMES[getRandomElementArray(OFFER_TIMES)],
      checkout: OFFER_TIMES[getRandomElementArray(OFFER_TIMES)],
      features: OFFER_FEATURES[getRandomElementArray(OFFER_FEATURES)],
      description: '',
      photos: housePhotos
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var addAds = function () {
  for (var i = 0; i < TOTAL_ADS; i++) {
    ads.push(generatePin(i));
  }
};

var createPinElement = function () {
  var pinFragment = document.createDocumentFragment();
  var buttonPin;
  var imagePin;
  for (var i = 0; i < ads.length; i++) {
    buttonPin = document.createElement('button');
    buttonPin.classList.add('map__pin');
    buttonPin.setAttribute('data-num', i);
    buttonPin.setAttribute('tabinex', '0');
    buttonPin.style.cssText = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;';
    imagePin = document.createElement('img');
    imagePin.setAttribute('src', ads[i].author.avatar);
    imagePin.setAttribute('width', PIN_WIDTH);
    imagePin.setAttribute('height', PIN_HEIGH);
    imagePin.setAttribute('draggable', false);
    buttonPin.appendChild(imagePin);
    pinFragment.appendChild(buttonPin);
  }
  return pinFragment;
};

var getOfferType = function (type) {
  return HOUSING_CATEGORIES[type];
};

var generateFeaturesDom = function (elem) {
  var featureFragment = document.createDocumentFragment();
  var feature;
  for (var i = 0; i < elem.offer.features.length; i++) {
    feature = document.createElement('li');
    feature.className = '.feature .feature--' + elem.offer.features[i];
    featureFragment.appendChild(feature);
  }
  return featureFragment;
};

var createElemDialogPanel = function (elem) {
  var renderElement = cardTemplate.cloneNode(true);
  var renderFragment = document.createDocumentFragment();
  renderElement.querySelector('h3').textContent = elem.offer.title;
  renderElement.querySelector('h3 + p > small').textContent = elem.offer.address;
  renderElement.querySelector('.popup__price').innerHTML = elem.offer.price + '&#x20bd;' + ' /ночь';
  renderElement.querySelector('h4').textContent = getOfferType(elem.offer.type);
  renderElement.querySelector('h4 + p').textContent = elem.offer.rooms + 'комнаты для ' + elem.offer.guests + ' гостей';
  renderElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
  renderElement.querySelector('.popup__features').appendChild(generateFeaturesDom(elem));
  renderElement.querySelector('.popup__pictures > li > img').setAttribute('src', elem.author.avatar);
  renderFragment.appendChild(renderElement);
  return renderFragment;
};

  // module4-task1
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
  var panel = createElemDialogPanel(ads[number]);
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
  addAds();
  pinMapContainer.appendChild(createPinElement());
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

var interactiveRenderPin = function () {
  loadPage();
  mapPinMain.addEventListener('mouseup', onPinMainClick);
};

interactiveRenderPin();

// Валидация формы
var validateForm = function () {
  var form = document.querySelector('.notice__form');
  var timeinForm = form.querySelector('select#timein');
  var timeoutForm = form.querySelector('select#timeout');
  var typeOfhousing = form.querySelector('select#type');
  var priceOfHousing = form.querySelector('input#price');
  var submitForm = form.querySelector('.form__submit');
  var roomNumber = form.querySelector('select#room_number');
  var capasityGuest = form.querySelector('select#capacity');
  var inputElements = form.querySelectorAll('input');

  var syncTimeOfArrive = function (evt) {
    timeoutForm.value = evt.target.value;
    timeinForm.value = evt.target.value;
  };

  var syncHousungMinPrice = function (evt) {
    switch (evt.target.value) {
      case 'flat': priceOfHousing.value = 1000; break;
      case 'bungalo': priceOfHousing.value = 0; break;
      case 'house': priceOfHousing.value = 5000; break;
      case 'palace': priceOfHousing.value = 10000; break;
    }
  };

  // typeOfhousing.addEventListener('change', function (evt) {
  //   var typeOfHousing = evt.target;
  //   var bungaloPriceMin = 0;
  //   var flatMinPrice = 1000;
  //   var houseMinPrice = 5000;
  //   var palaceMinPrice = 10000;
  //   switch (typeOfHousing.value) {
  //     case 'bungalo':
  //       priceOfHousing.min = bungaloPriceMin;
  //       break;
  //     case 'flat':
  //       priceOfHousing.min = flatMinPrice;
  //       break;
  //     case 'house':
  //       priceOfHousing.min = houseMinPrice;
  //       break;
  //     case 'palace':
  //       priceOfHousing.min = palaceMinPrice;
  //       break;
  //   }
  // });
  typeOfhousing.addEventListener('change', function (evt) {
    var typeOfHousing = evt.target;
    var bungaloPriceMin = 0;
    var flatMinPrice = 1000;
    var houseMinPrice = 5000;
    var palaceMinPrice = 10000;

    switch (typeOfHousing.value) {
      case 'bungalo':
        priceOfHousing.min = bungaloPriceMin;
        break;
      case 'flat':
        priceOfHousing.min = flatMinPrice;
        break;
      case 'house':
        priceOfHousing.min = houseMinPrice;
        break;
      case 'palace':
        priceOfHousing.min = palaceMinPrice;
        break;
    }
  });

  var setGuestInRooms = function (evt) {
    var quantityRooom = evt.target;
    switch (quantityRooom.value) {
      case '1': capasityGuest.value = 1; break;
      case '2': capasityGuest.value = 2; break;
      case '3': capasityGuest.value = 3; break;
      case '100': capasityGuest.value = 0; break;
    }
  };

  var checkValidity = function () {
    for (var i = 0; i < inputElements.length; i++) {
      var userNameInput = inputElements[i];
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 100-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else if (userNameInput.validity.rangeOverflow) {
        userNameInput.setCustomValidity('Не соответствует максимальное значение');
      } else if (userNameInput.validity.rangeUnderflow) {
        userNameInput.setCustomValidity('Не соответствует минимальное значение');
      }
    }
  };

  timeinForm.addEventListener('change', syncTimeOfArrive);
  timeoutForm.addEventListener('change', syncTimeOfArrive);
  typeOfhousing.addEventListener('change', syncHousungMinPrice);
  roomNumber.addEventListener('change', setGuestInRooms);
  submitForm.addEventListener('submit', checkValidity);
};

validateForm();
