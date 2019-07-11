"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var datoClient, spinner, uploads, progress, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, upload;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datoClient = _ref.datoClient;
            spinner = (0, _ora.default)('Fetching assets not in use').start();
            _context.next = 4;
            return datoClient.uploads.all({
              'filter[type]': 'not_used'
            }, {
              allPages: true
            });

          case 4:
            uploads = _context.sent;
            spinner.succeed();

            if (!(uploads.length > 0)) {
              _context.next = 45;
              break;
            }

            progress = new _progress.default(uploads.length, 'Destroying assets not in use');
            spinner = (0, _ora.default)('').start();
            spinner.text = progress.tick();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;
            _iterator = uploads[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 30;
              break;
            }

            upload = _step.value;
            _context.prev = 17;
            _context.next = 20;
            return datoClient.uploads.destroy(upload.id);

          case 20:
            spinner.text = progress.tick();
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](17);
            spinner.fail(_context.t0);
            process.exit();

          case 27:
            _iteratorNormalCompletion = true;
            _context.next = 15;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](13);
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

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 32, 36, 44], [17, 23], [37,, 39, 43]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;