'use strict';
(function () {
  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var HOUSING_CATEGORIES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
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

  window.createElemDialogPanel = function (elem) {
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
})();
