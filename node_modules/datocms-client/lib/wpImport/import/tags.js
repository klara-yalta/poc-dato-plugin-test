"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tags;

var _allPages = _interopRequireDefault(require("../utils/allPages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../utils/progress'),
    progress = _require.progress;

function tags(_x, _x2, _x3) {
  return _tags.apply(this, arguments);
}

function _tags() {
  _tags = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dato, wp, itemTypeId) {
    var mapping, resources, tick, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tag;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mapping = {};
            _context.next = 3;
            return (0, _allPages.default)('Fetching tags', wp.tags());

          case 3:
            resources = _context.sent;
            tick = progress('Creating tags', resources.length);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = resources[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            tag = _step.value;
            _context.next = 14;
            return tick(tag.name, dato.items.create({
              itemType: itemTypeId,
              name: tag.name,
              slug: tag.slug
            }));

          case 14:
            mapping[tag.id] = _context.sent.id;

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            return _context.abrupt("return", mapping);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 20, 24, 32], [25,, 27, 31]]);
  }));
  return _tags.apply(this, arguments);
}