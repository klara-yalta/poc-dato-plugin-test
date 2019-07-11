"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _toApiKey = require("./toApiKey");

var _progress = _interopRequireDefault(require("./progress"));

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
    var datoClient, contentfulData, spinner, itemTypes, importedItemTypes, importedFieldIds, progress, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, fieldId, field, validators;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datoClient = _ref.datoClient, contentfulData = _ref.contentfulData;
            spinner = (0, _ora.default)('Fetching existing fields').start();
            _context.next = 4;
            return datoClient.itemTypes.all();

          case 4:
            itemTypes = _context.sent;
            importedItemTypes = itemTypes.filter(function (itemType) {
              return contentfulData.contentTypes.some(function (contentType) {
                return itemType.apiKey === (0, _toApiKey.toItemApiKey)(contentType.sys.id);
              });
            });
            importedFieldIds = importedItemTypes.map(function (itemType) {
              return itemType.fields;
            }).flatten();
            spinner.succeed();
            spinner = (0, _ora.default)('').start();
            progress = new _progress.default(importedFieldIds.length, 'Removing validations from fields');
            spinner.text = progress.tick();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = importedFieldIds[Symbol.iterator]();

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 46;
              break;
            }

            fieldId = _step.value;

          case 18:
            if (!true) {
              _context.next = 43;
              break;
            }

            _context.prev = 19;
            _context.next = 22;
            return datoClient.fields.find(fieldId);

          case 22:
            field = _context.sent;
            validators = {};

            if (field.validators.itemItemType) {
              validators = {
                itemItemType: field.validators.itemItemType
              };
            }

            if (field.validators.itemsItemType) {
              validators = {
                itemsItemType: field.validators.itemsItemType
              };
            }

            _context.next = 28;
            return datoClient.fields.update(fieldId, {
              validators: validators
            });

          case 28:
            spinner.text = progress.tick();
            return _context.abrupt("break", 43);

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](19);

            if (!(!_context.t0.body || !_context.t0.body.data || !_context.t0.body.data.some(function (d) {
              return d.id === 'BATCH_DATA_VALIDATION_IN_PROGRESS';
            }))) {
              _context.next = 39;
              break;
            }

            spinner.fail(_context.t0);
            process.exit();
            _context.next = 41;
            break;

          case 39:
            _context.next = 41;
            return (0, _delay.default)(1000);

          case 41:
            _context.next = 18;
            break;

          case 43:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 46:
            _context.next = 52;
            break;

          case 48:
            _context.prev = 48;
            _context.t1 = _context["catch"](14);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 52:
            _context.prev = 52;
            _context.prev = 53;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 55:
            _context.prev = 55;

            if (!_didIteratorError) {
              _context.next = 58;
              break;
            }

            throw _iteratorError;

          case 58:
            return _context.finish(55);

          case 59:
            return _context.finish(52);

          case 60:
            spinner.succeed();

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[14, 48, 52, 60], [19, 32], [53,, 55, 59]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;