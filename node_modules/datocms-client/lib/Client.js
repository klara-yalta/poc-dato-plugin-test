"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _ApiException = _interopRequireDefault(require("./ApiException"));

var _package = _interopRequireDefault(require("../package.json"));

var _fetch = _interopRequireDefault(require("./utils/fetch"));

var _wait = _interopRequireDefault(require("./utils/wait"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var undefinedToNull = function undefinedToNull(k, v) {
  return v === undefined ? null : v;
};

var Client =
/*#__PURE__*/
function () {
  function Client(token, extraHeaders, baseUrl) {
    _classCallCheck(this, Client);

    this.baseUrl = baseUrl;
    this.token = token;
    this.extraHeaders = extraHeaders;
  }

  _createClass(Client, [{
    key: "get",
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(this.buildUrl(url, params), options);
    }
  }, {
    key: "put",
    value: function put(url, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'PUT',
        body: JSON.stringify(body, undefinedToNull)
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'POST',
        body: JSON.stringify(body, undefinedToNull)
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(this.buildUrl(url, params), Object.assign({
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "defaultHeaders",
    value: function defaultHeaders() {
      return {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: "Bearer ".concat(this.token),
        'user-agent': "js-client v".concat(_package.default.version),
        'X-Api-Version': '2'
      };
    }
  }, {
    key: "buildUrl",
    value: function buildUrl(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = Object.keys(params).length ? "?".concat(_querystring.default.stringify(params)) : '';
      return "".concat(this.baseUrl).concat(path).concat(query);
    }
  }, {
    key: "request",
    value: function request(url) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var fullHeaders = Object.assign({}, this.defaultHeaders(), this.extraHeaders, options.headers);
      var fullOptions = Object.assign({}, options, {
        headers: fullHeaders
      }); // TODO console.log(url, fullOptions);

      return (0, _fetch.default)(url, fullOptions).then(function (res) {
        if (res.status === 429) {
          var waitTime = res.headers.get('X-RateLimit-Reset') || '10';
          console.log("Rate limit exceeded, waiting ".concat(waitTime, " seconds..."));
          return (0, _wait.default)(parseInt(waitTime, 10) * 1000).then(function () {
            return _this.request(url, options);
          });
        }

        return (res.status !== 204 ? res.json() : Promise.resolve(null)).then(function (body) {
          if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(body);
          }

          return Promise.reject(new _ApiException.default(res, body));
        }).catch(function (error) {
          if (error && error.body && error.body.data && error.body.data.some(function (e) {
            return e.attributes.code === 'BATCH_DATA_VALIDATION_IN_PROGRESS';
          })) {
            return (0, _wait.default)(1000).then(function () {
              return _this.request(url, options);
            });
          }

          throw error;
        });
      });
    }
  }]);

  return Client;
}();

exports.default = Client;