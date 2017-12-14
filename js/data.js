'use strict';
(function () {
  window.getData = (function () {
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
      var locationX = getRandomNumber(300, 900);
      var locationY = getRandomNumber(100, 500);
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
    for (var i = 0; i < TOTAL_ADS; i++) {
      ads.push(generatePin(i));
    }
    return ads;
  });
})();
