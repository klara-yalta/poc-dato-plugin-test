"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

var _toApiKey = require("./toApiKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var datoClient, contentfulData, spinner, itemTypes, importedItemTypes, progress, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, itemType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datoClient = _ref.datoClient, contentfulData = _ref.contentfulData;
            spinner = (0, _ora.default)('Fetching existing models').start();
            _context.next = 4;
            return datoClient.itemTypes.all();

          case 4:
            itemTypes = _context.sent;
            importedItemTypes = itemTypes.filter(function (itemType) {
              return contentfulData.contentTypes.some(function (contentType) {
                return itemType.apiKey === (0, _toApiKey.toItemApiKey)(contentType.sys.id);
              });
            });
            spinner.succeed();

            if (!(importedItemTypes.length > 0)) {
              _context.next = 46;
              break;
            }

            spinner = (0, _ora.default)('').start();
            progress = new _progress.default(importedItemTypes.length, 'Destroying existing models');
            spinner.text = progress.tick();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = importedItemTypes[Symbol.iterator]();

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 31;
              break;
            }

            itemType = _step.value;
            _context.prev = 18;
            spinner.text = progress.tick();
            _context.next = 22;
            return datoClient.itemTypes.destroy(itemType.id);

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](18);
            spinner.fail(_context.t0);
            process.exit();

          case 28:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 31:
            _context.next = 37;
            break;

          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](14);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 37:
            _context.prev = 37;
            _context.prev = 38;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 40:
            _context.prev = 40;

            if (!_didIteratorError) {
              _context.next = 43;
              break;
            }

            throw _iteratorError;

          case 43:
            return _context.finish(40);

          case 44:
            return _context.finish(37);

          case 45:
            spinner.succeed();

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[14, 33, 37, 45], [18, 24], [38,, 40, 44]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;