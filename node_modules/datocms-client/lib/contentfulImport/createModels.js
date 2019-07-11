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
    var datoClient, contentfulData, spinner, contentTypes, progress, itemTypes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, contentType, itemTypeApiKey, itemAttributes, itemType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datoClient = _ref.datoClient, contentfulData = _ref.contentfulData;
            spinner = (0, _ora.default)().start();
            contentTypes = contentfulData.contentTypes;
            progress = new _progress.default(contentTypes.length, 'Creating models');
            spinner.text = progress.tick();
            itemTypes = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = contentTypes[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 30;
              break;
            }

            contentType = _step.value;
            itemTypeApiKey = (0, _toApiKey.toItemApiKey)(contentType.sys.id);
            itemAttributes = {
              apiKey: itemTypeApiKey,
              name: contentType.name,
              modularBlock: false,
              orderingDirection: null,
              singleton: false,
              sortable: false,
              tree: false,
              orderingField: null,
              draftModeActive: true
            };
            _context.prev = 15;
            _context.next = 18;
            return datoClient.itemTypes.create(itemAttributes);

          case 18:
            itemType = _context.sent;
            spinner.text = progress.tick();
            itemTypes.push(itemType);
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](15);
            spinner.fail(_context.t0);
            process.exit();

          case 27:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 36:
            _context.prev = 36;
            _context.prev = 37;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 39:
            _context.prev = 39;

            if (!_didIteratorError) {
              _context.next = 42;
              break;
            }

            throw _iteratorError;

          case 42:
            return _context.finish(39);

          case 43:
            return _context.finish(36);

          case 44:
            spinner.succeed();
            return _context.abrupt("return", itemTypes);

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 32, 36, 44], [15, 23], [37,, 39, 43]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;