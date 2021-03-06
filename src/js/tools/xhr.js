export default {

  set request(requestParameters) {

    const ErrorAttr = {
      FILE: 'xhr.js',
      MESSADGE: {
        JSON_ERR: 'XHR: JSON error converting response.',
        LOAD_ERR: 'Load Error.',
        CONNECT_ERR: 'Connection error.',
        TIMEOUT_ERR: 'Сonnection timeout exceeded'
      }
    };

    let getError = function (messadge, row, error) {
      let newError = new SyntaxError(messadge, ErrorAttr.FILE, row);
      newError.cause = error;
      return newError;
    };

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        let response = '';

        try {

          response = JSON.parse(xhr.response);
        } catch (error) {
          requestParameters.callbackError(getError(ErrorAttr.MESSADGE.JSON_ERR,
            26, error));
        }

        requestParameters.callbackSuccess(response);
      } else {
        requestParameters.callbackError(
          getError(`${ErrorAttr.MESSADGE.LOAD_ERR} ${xhr.statusText}`,
          35, ''));
      }
    });

    xhr.addEventListener('error', function () {
      requestParameters.callbackError(
        getError(`${ErrorAttr.MESSADGE.CONNECT_ERR} ${xhr.statusText}`,
        42, ''));
    });

    xhr.addEventListener('timeout', function () {
      requestParameters.callbackError(getError(
        `${ErrorAttr.MESSADGE.CONNECT_ERR} (${xhr.timeout}ms.)`,
        50, ''));
    });

    xhr.timeout = window.appSettings.xhrSettings.timeout;
    xhr.open(requestParameters.metod, window.appSettings.xhrSettings.urlApi + requestParameters.url, true);
    xhr.setRequestHeader('Content-Type', window.appSettings.xhrSettings.contentType);

    if (requestParameters.metod === 'GET') {
      requestParameters.data = '';
    }

    xhr.send(requestParameters.data);
  }

};
