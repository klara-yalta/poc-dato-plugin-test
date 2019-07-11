"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pages;

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

var _allPages = _interopRequireDefault(require("../utils/allPages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../utils/progress'),
    progress = _require.progress;

function pages(_x, _x2, _x3, _x4, _x5) {
  return _pages.apply(this, arguments);
}

function _pages() {
  _pages = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(dato, wp, schema, media, authors) {
    var resources, tick, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _allPages.default)('Fetching pages', wp.pages());

          case 2:
            resources = _context3.sent;
            tick = progress('Creating pages', resources.length);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 7;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var page, createAndPublish;
              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      page = _step.value;

                      createAndPublish =
                      /*#__PURE__*/
                      function () {
                        var _ref = _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee() {
                          var newItem;
                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return dato.items.create({
                                    itemType: schema.pageId,
                                    title: page.title.rendered,
                                    slug: page.slug,
                                    content: Object.entries(media.urls).reduce(function (acc, _ref2) {
                                      var _ref3 = _slicedToArray(_ref2, 2),
                                          k = _ref3[0],
                                          v = _ref3[1];

                                      return acc.replace(new RegExp((0, _escapeStringRegexp.default)(k), 'ig'), v);
                                    }, page.content.rendered),
                                    excerpt: Object.entries(media.urls).reduce(function (acc, _ref4) {
                                      var _ref5 = _slicedToArray(_ref4, 2),
                                          k = _ref5[0],
                                          v = _ref5[1];

                                      return acc.replace(new RegExp((0, _escapeStringRegexp.default)(k), 'ig'), v);
                                    }, page.excerpt.rendered),
                                    date: page.date,
                                    author: authors[page.author],
                                    featuredMedia: media.ids[page.featured_media]
                                  });

                                case 2:
                                  newItem = _context.sent;

                                  if (!(page.status === 'publish' || page.status === 'future')) {
                                    _context.next = 6;
                                    break;
                                  }

                                  _context.next = 6;
                                  return dato.items.publish(newItem.id);

                                case 6:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee, this);
                        }));

                        return function createAndPublish() {
                          return _ref.apply(this, arguments);
                        };
                      }();

                      _context2.next = 4;
                      return tick(page.title.rendered, createAndPublish());

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, this);
            });
            _iterator = resources[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 15;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 12);

          case 12:
            _iteratorNormalCompletion = true;
            _context3.next = 10;
            break;

          case 15:
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t1 = _context3["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 21:
            _context3.prev = 21;
            _context3.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 24:
            _context3.prev = 24;

            if (!_didIteratorError) {
              _context3.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context3.finish(24);

          case 28:
            return _context3.finish(21);

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, this, [[7, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _pages.apply(this, arguments);
}