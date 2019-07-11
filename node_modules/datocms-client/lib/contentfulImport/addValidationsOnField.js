"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

var _toApiKey = require("./toApiKey");

var _datoFieldValidatorsFor = _interopRequireDefault(require("./datoFieldValidatorsFor"));

var _delay = _interopRequireDefault(require("./delay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var itemTypes, fieldsMapping, datoClient, contentfulData, spinner, contentTypes, fieldsSize, progress, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, contentType, contentTypeApiKey, itemTypeFields, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, _loop, _ret;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            itemTypes = _ref.itemTypes, fieldsMapping = _ref.fieldsMapping, datoClient = _ref.datoClient, contentfulData = _ref.contentfulData;
            spinner = (0, _ora.default)('').start();
            contentTypes = contentfulData.contentTypes;
            fieldsSize = contentTypes.map(function (contentType) {
              return contentType.fields.length;
            }).reduce(function (acc, length) {
              return acc + length;
            }, 0);
            progress = new _progress.default(fieldsSize, 'Adding validations on fields');
            spinner.text = progress.tick();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 9;
            _iterator = contentTypes[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 50;
              break;
            }

            contentType = _step.value;
            contentTypeApiKey = (0, _toApiKey.toItemApiKey)(contentType.sys.id);
            itemTypeFields = fieldsMapping[contentTypeApiKey];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 18;
            _iterator2 = contentType.fields[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 33;
              break;
            }

            field = _step2.value;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var fieldApiKey, datoField, validators;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      fieldApiKey = (0, _toApiKey.toFieldApiKey)(field.id);
                      datoField = itemTypeFields.find(function (f) {
                        return f.apiKey === fieldApiKey;
                      });

                      if (datoField) {
                        _context.next = 4;
                        break;
                      }

                      return _context.abrupt("return", "break");

                    case 4:
                      _context.next = 6;
                      return (0, _datoFieldValidatorsFor.default)({
                        field: field,
                        itemTypes: itemTypes
                      });

                    case 6:
                      validators = _context.sent;
                      _context.prev = 7;
                      _context.next = 10;
                      return datoClient.fields.update(datoField.id, {
                        validators: validators
                      });

                    case 10:
                      spinner.text = progress.tick();
                      return _context.abrupt("return", "break");

                    case 14:
                      _context.prev = 14;
                      _context.t0 = _context["catch"](7);

                      if (!(!_context.t0.body || !_context.t0.body.data || !_context.t0.body.data.some(function (d) {
                        return d.id === 'BATCH_DATA_VALIDATION_IN_PROGRESS';
                      }))) {
                        _context.next = 21;
                        break;
                      }

                      spinner.fail(_context.t0);
                      process.exit();
                      _context.next = 23;
                      break;

                    case 21:
                      _context.next = 23;
                      return (0, _delay.default)(1000);

                    case 23:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, this, [[7, 14]]);
            });

          case 23:
            if (!true) {
              _context2.next = 30;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 25);

          case 25:
            _ret = _context2.t0;

            if (!(_ret === "break")) {
              _context2.next = 28;
              break;
            }

            return _context2.abrupt("break", 30);

          case 28:
            _context2.next = 23;
            break;

          case 30:
            _iteratorNormalCompletion2 = true;
            _context2.next = 20;
            break;

          case 33:
            _context2.next = 39;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t1 = _context2["catch"](18);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 39:
            _context2.prev = 39;
            _context2.prev = 40;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 42:
            _context2.prev = 42;

            if (!_didIteratorError2) {
              _context2.next = 45;
              break;
            }

            throw _iteratorError2;

          case 45:
            return _context2.finish(42);

          case 46:
            return _context2.finish(39);

          case 47:
            _iteratorNormalCompletion = true;
            _context2.next = 11;
            break;

          case 50:
            _context2.next = 56;
            break;

          case 52:
            _context2.prev = 52;
            _context2.t2 = _context2["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context2.t2;

          case 56:
            _context2.prev = 56;
            _context2.prev = 57;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 59:
            _context2.prev = 59;

            if (!_didIteratorError) {
              _context2.next = 62;
              break;
            }

            throw _iteratorError;

          case 62:
            return _context2.finish(59);

          case 63:
            return _context2.finish(56);

          case 64:
            spinner.succeed();

          case 65:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this, [[9, 52, 56, 64], [18, 35, 39, 47], [40,, 42, 46], [57,, 59, 63]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;