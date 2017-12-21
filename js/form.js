'use strict';
(function () {
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var TYPES_OF_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
  var PRICE_OF_HOUSING = [BUNGALO_MIN_PRICE, FLAT_MIN_PRICE, HOUSE_MIN_PRICE, PALACE_MIN_PRICE];
  var ROOMS = ['1', '2', '3', '100'];
  var CAPACITYS = ['1', '2', '3', '0'];
  var form = document.querySelector('.notice__form');
  var timeinForm = form.querySelector('select#timein');
  var timeoutForm = form.querySelector('select#timeout');
  var typeOfhousing = form.querySelector('select#type');
  var priceOfHousing = form.querySelector('input#price');
  var roomNumber = form.querySelector('select#room_number');
  var capacityGuest = form.querySelector('select#capacity');
  var inputElements = form.querySelectorAll('input');

  var syncTimeOfArrive = function (elem1, elem2, arr1, arr2) {
    if (arr1.length === arr2.length) {
      for (var i = 0; i < arr1.length; i++) {
        if (elem1.value === arr1[i]) {
          elem2.value = arr2[i];
        }
      }
    }
  };

  var syncHousungMinPrice = function (elem1, elem2, arr1, arr2) {
    if (arr1.length === arr2.length) {
      for (var i = 0; i < arr1.length; i++) {
        switch (elem1.value) {
          case (arr1[i]): elem2.value = arr2[i]; break;
        }
        switch (elem1.value) {
          case (arr1[i]):
            elem2.min = arr2[i]; break;
        }
      }
    }
  };

  var setGuestInRooms = function (elem1, elem2, arr1, arr2) {
    if (arr1.length === arr2.length) {
      for (var i = 0; i < arr1.length; i++) {
        switch (elem1.value) {
          case arr1[i]: elem2.value = arr2[i]; break;
        }
      }
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

  var succsess = function () {
    form.reset();
  };

  var formSubmitSave = function (evt) {
    checkValidity(evt);
    window.backend.save(new FormData(form), succsess, window.errorHandler);
    evt.preventDefault();

  };

  timeinForm.addEventListener('change', function () {
    window.synchronizeFields(timeinForm, timeoutForm, OFFER_TIMES, OFFER_TIMES, syncTimeOfArrive);
  });
  timeoutForm.addEventListener('change', function () {
    window.synchronizeFields(timeoutForm, timeinForm, OFFER_TIMES, OFFER_TIMES, syncTimeOfArrive);
  });

  typeOfhousing.addEventListener('change', function () {
    window.synchronizeFields(typeOfhousing, priceOfHousing, TYPES_OF_HOUSING, PRICE_OF_HOUSING, syncHousungMinPrice);
  });

  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumber, capacityGuest, ROOMS, CAPACITYS, setGuestInRooms);
  });
  form.addEventListener('submit', checkValidity);
  form.addEventListener('submit', formSubmitSave);
})();

