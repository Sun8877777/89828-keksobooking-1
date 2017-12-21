/*
// Модуль для работы с сервером данных

'use strict';

(function () {
  var netData = {
    URL: 'https://js.dump.academy/keksobooking',
    URL_ADDITION: '/data',
    OK_STATUS: 200,
    TIMEOUT: 10000,
    DATA_TYPE: 'json',
    ERROR_MAIN: 'Произошла ошибка: ',
    ERROR_CONNECTION: 'Произошла ошибка соединения',
    ERROR_TIMEOUT: 'Запрос не успел выполниться за '
  };

  // Функция, возвращающая созданный и обернутый в необходимые обработчики объект xhr
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = netData.DATA_TYPE;
    xhr.timeout = netData.TIMEOUT;

    // Вешаем обработчик ответа с сервера
    xhr.addEventListener('load', function () {
      if (xhr.status === netData.OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(netData.ERROR_MAIN + xhr.status + ' ' + xhr.statusText);
      }
    });

    // Вешаем обработчик ошибки соединения
    xhr.addEventListener('error', function () {
      onError(netData.ERROR_CONNECTION);
    });

    // Вешаем обработчик таймаута
    xhr.addEventListener('timeout', function () {
      onError(netData.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    // Функция для загрузки данных с сервера
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', netData.URL + netData.URL_ADDITION);
      xhr.send();
    },

    // Функция для отправки данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', netData.URL);
      xhr.send(data);
    }
  };
})();
*/
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
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = ERROR_STATUS + xhr.status + ' ' + xhr.statusText;
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

