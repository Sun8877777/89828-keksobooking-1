'use strict';

var TOTAL_ADS = 8;
var DESK_OF_CONDITIONS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSING_CATEGORIES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 40;
var PIN_HEIGH = 40;
var mainMap = document.querySelector('.map');
var pinMap = document.querySelector('.map__pins');
var pinMapFilter = mainMap.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var mainFormPage = document.querySelector('.notice__form');
var fieldsetMainForm = mainFormPage.querySelectorAll('fieldset');
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
      checkin: getRandomElementArray(OFFER_TIMES),
      checkout: getRandomElementArray(OFFER_TIMES),
      features: getRandomElementArray(OFFER_FEATURES),
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
  document.querySelector('.map').classList.remove('map--faded');
  var pinFragment = document.createDocumentFragment();
  var buttonPin;
  var imagePin;
  for (var i = 0; i < ads.length; i++) {
    buttonPin = document.createElement('button');
    buttonPin.style.cssText = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;';
    buttonPin.classList.add('map__pin');
    buttonPin.setAttribute('data-num', i);
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

var addClassTo = function (element, className) {
  return element.classList.add(className);
};

var removeClassFrom = function (element, className) {
  return element.classList.remove(className);
};

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    removeClassFrom(element,'hidden');
  }
};

var hideElement = function (element) {
  if (!(element.classList.contains('hidden'))) {
    addClassTo(element, 'hidden');
  }
};

var getDataNum = function (dataNum) { // получение номера из data -атрибута
  return dataNum.getAttribute('data-num');
};
var removeContent = function (array) {
  for (var i = array.childNodes.length - 1; i >= 0; i--) {
    array.removeChild(array.childNodes[i]);
  }
};

var onLoadPage = function () {
  mainMap.classList.add('map--faded');
  if (mainFormPage.classList.contains === 'notice__form--disabled') {
    disabledElemMainForm(fieldsetMainForm);
  } else {
    addClassTo(mainFormPage, 'notice__form--disabled');
    disabledElemMainForm(fieldsetMainForm);
  }
};

var renderControlPanel = function (number) {
  removeContent(pinMap);
  mainMap.insertBefore(createElemDialogPanel(ads[number]), pinMapFilter);
};

var onPinClick = function (evt) {
  var pin = evt.currentTarget;
  window.removeEventListener('DOMContentLoaded', onLoadPage);
  removeClassFrom(mainFormPage, 'notice__form--disabled');
  addClassTo(pin, 'map__pin--active');
  renderControlPanel(getDataNum(pin));
};
var interactiveRenderPin = function () {
  window.addEventListener('DOMContentLoaded', onLoadPage);
  mapPinMain.addEventListener('mouseup', onPinClick);
};

addAds();
pinMap.appendChild(createPinElement());
interactiveRenderPin();
