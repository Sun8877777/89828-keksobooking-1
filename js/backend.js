'use strict';
(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var URL_PART_DATA = '/data';
  var TIMEOUT = 10000;
  var DATA_TYPE = 'json';
  var ERROR_STATUS = 'Неизвестный статус: ';
  var ERROR_CONNECTION = 'Произошла ошибка соединения';
  var ERROR_TIMEOUT = 'Запрос не успел выполниться за ';

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_TYPE;

    xhr.addEventListener('load', function () {
      var msg;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          msg = 'Неверный запрос';
          onError('Неверный запрос');
          break;
        case 401:
          onError(xhr.response);
          msg = 'Пользователь не авторизован';
          break;
        case 404:
          onError(xhr.response);
          msg = 'Ничего не найдено';
          break;
        default:
          msg = ERROR_STATUS + xhr.status + ' ' + xhr.statusText;
          onError(msg);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', SERVER_URL + URL_PART_DATA);
      xhr.send();
    }
  };
})();
