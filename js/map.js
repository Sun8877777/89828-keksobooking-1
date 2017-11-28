'use strict';

var TOTAL_ADS = 8;
var DESK_OF_CONDITIONS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSING_CATEGORIES = ['flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 40;
var PIN_HEIGH = 40;
var mapPins = document.querySelector('.map__pins');
var housePhotos = [];
var ads = [];
document.querySelector('.map').classList.remove('map--faded');

var getRandomElementArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateArrayAds = function (numberAvatar) {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);
  return {
    author: {
      avatar: 'img/avatars/user0' + numberAvatar + '.png'
    },
    offer: {
      title: getRandomElementArray(DESK_OF_CONDITIONS),
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
    ads.push(generateArrayAds(i));
  }
};

addAds();

var createPinElement = function () {
  var pinFragment = document.createDocumentFragment();
  var buttonPin;
  var imagePin;
  for (var i = 0; i < addAds.length; i++) {
    buttonPin = document.createElement('button');
    buttonPin.style.cssText = 'left: ' + addAds[i].location.x + 'px; top: ' + addAds[i].location.y + 'px;';
    buttonPin.classList.add('map__pin');
    imagePin = document.createElement('img');
    imagePin.setAttribute('src', addAds[i].author.avatar);
    imagePin.setAttribute('width', PIN_WIDTH);
    imagePin.setAttribute('height', PIN_HEIGH);
    imagePin.setAttribute('draggable', false);
    buttonPin.appendChild(imagePin);
    pinFragment.appendChild(buttonPin);
  }
  return pinFragment;
};

mapPins.appendChild(createPinElement(addAds));


