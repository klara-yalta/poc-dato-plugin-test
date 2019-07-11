"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = category;

var _slug = _interopRequireDefault(require("./fields/slug"));

var _text = _interopRequireDefault(require("./fields/text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function category(_x) {
  return _category.apply(this, arguments);
}

function _category() {
  _category = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dato) {
    var itemType;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dato.itemTypes.create({
              apiKey: 'category',
              name: 'Category',
              tree: true
            });

          case 2:
            itemType = _context.sent;
            _context.next = 5;
            return (0, _slug.default)(itemType, dato, 'name');

          case 5:
            _context.next = 7;
            return (0, _text.default)(itemType, dato, 'description');

          case 7:
            return _context.abrupt("return", itemType.id);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _category.apply(this, arguments);
}