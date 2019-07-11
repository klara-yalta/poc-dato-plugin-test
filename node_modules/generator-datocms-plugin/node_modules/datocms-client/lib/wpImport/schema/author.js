"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = author;

var _slug = _interopRequireDefault(require("./fields/slug"));

var _text = _interopRequireDefault(require("./fields/text"));

var _string = _interopRequireDefault(require("./fields/string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function author(_x) {
  return _author.apply(this, arguments);
}

function _author() {
  _author = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dato) {
    var itemType, authorsFields, _i, apiKey;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dato.itemTypes.create({
              apiKey: 'author',
              name: 'Author'
            });

          case 2:
            itemType = _context.sent;
            _context.next = 5;
            return (0, _slug.default)(itemType, dato, 'name');

          case 5:
            authorsFields = ['username', 'first_name', 'last_name', 'email', 'url', 'nickname'];
            _i = 0;

          case 7:
            if (!(_i < authorsFields.length)) {
              _context.next = 14;
              break;
            }

            apiKey = authorsFields[_i];
            _context.next = 11;
            return (0, _string.default)(itemType, dato, apiKey);

          case 11:
            _i++;
            _context.next = 7;
            break;

          case 14:
            _context.next = 16;
            return (0, _text.default)(itemType, dato, 'description');

          case 16:
            return _context.abrupt("return", itemType.id);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _author.apply(this, arguments);
}