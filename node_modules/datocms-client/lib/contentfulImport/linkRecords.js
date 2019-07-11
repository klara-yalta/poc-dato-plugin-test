"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

var _toApiKey = require("./toApiKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('humps'),
    camelize = _require.camelize;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var fieldsMapping, datoClient, contentfulData, contentfulRecordMap, spinner, entries, defaultLocale, progress, recordsToPublish, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fieldsMapping = _ref.fieldsMapping, datoClient = _ref.datoClient, contentfulData = _ref.contentfulData, contentfulRecordMap = _ref.contentfulRecordMap;
            spinner = (0, _ora.default)('').start();
            entries = contentfulData.entries, defaultLocale = contentfulData.defaultLocale;
            progress = new _progress.default(entries.length, 'Linking records');
            recordsToPublish = [];
            spinner.text = progress.tick();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 9;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var entry, contentType, contentTypeApiKey, datoItemId, itemTypeFields, recordAttributes;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      entry = _step.value;
                      contentType = entry.sys.contentType;
                      contentTypeApiKey = (0, _toApiKey.toItemApiKey)(contentType.sys.id);
                      datoItemId = contentfulRecordMap[entry.sys.id];
                      itemTypeFields = fieldsMapping[contentTypeApiKey];
                      recordAttributes = Object.entries(entry.fields).reduce(function (outerAcc, _ref3) {
                        var _ref4 = _slicedToArray(_ref3, 2),
                            option = _ref4[0],
                            value = _ref4[1];

                        var apiKey = (0, _toApiKey.toFieldApiKey)(option);
                        var field = itemTypeFields.find(function (itemTypefield) {
                          return itemTypefield.apiKey === apiKey;
                        });

                        if (field.fieldType !== 'link' && field.fieldType !== 'links') {
                          return outerAcc;
                        }

                        if (field.localized) {
                          var localizedValue = Object.keys(value).reduce(function (innerAcc, locale) {
                            var innerValue = value[locale];

                            if (field.fieldType === 'link') {
                              return Object.assign(innerAcc, _defineProperty({}, locale.slice(0, 2), contentfulRecordMap[innerValue.sys.id]));
                            }

                            return Object.assign(innerAcc, _defineProperty({}, locale.slice(0, 2), innerValue.filter(function (link) {
                              return contentfulRecordMap[link.sys.id];
                            }).map(function (link) {
                              return contentfulRecordMap[link.sys.id];
                            })));
                          }, {});
                          var fallbackValues = contentfulData.locales.reduce(function (accLocales, locale) {
                            return Object.assign(accLocales, _defineProperty({}, locale.slice(0, 2), localizedValue[defaultLocale.slice(0, 2)]));
                          }, {});
                          return Object.assign(outerAcc, _defineProperty({}, camelize(apiKey), _objectSpread({}, fallbackValues, localizedValue)));
                        }

                        var innerValue = value[defaultLocale];

                        if (field.fieldType === 'link') {
                          return Object.assign(outerAcc, _defineProperty({}, camelize(apiKey), contentfulRecordMap[innerValue.sys.id]));
                        }

                        return Object.assign(outerAcc, _defineProperty({}, camelize(apiKey), innerValue.filter(function (link) {
                          return contentfulRecordMap[link.sys.id];
                        }).map(function (link) {
                          return contentfulRecordMap[link.sys.id];
                        })));
                      }, {});
                      _context.prev = 6;

                      if (!(Object.entries(recordAttributes).length > 0)) {
                        _context.next = 11;
                        break;
                      }

                      _context.next = 10;
                      return datoClient.items.update(datoItemId, recordAttributes);

                    case 10:
                      if (entry.sys.publishedVersion) {
                        recordsToPublish.push(datoItemId);
                      }

                    case 11:
                      spinner.text = progress.tick();
                      _context.next = 18;
                      break;

                    case 14:
                      _context.prev = 14;
                      _context.t0 = _context["catch"](6);
                      spinner.fail(_context.t0);
                      process.exit();

                    case 18:
                      spinner.text = progress.tick();

                    case 19:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, this, [[6, 14]]);
            });
            _iterator = entries[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 17;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 14);

          case 14:
            _iteratorNormalCompletion = true;
            _context2.next = 12;
            break;

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t1 = _context2["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 23:
            _context2.prev = 23;
            _context2.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 26:
            _context2.prev = 26;

            if (!_didIteratorError) {
              _context2.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context2.finish(26);

          case 30:
            return _context2.finish(23);

          case 31:
            spinner.succeed();
            return _context2.abrupt("return", recordsToPublish);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this, [[9, 19, 23, 31], [24,, 26, 30]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;