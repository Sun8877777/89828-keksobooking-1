'use strict';
// Валидация формы
(function () {
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
})();

// validateForm();
