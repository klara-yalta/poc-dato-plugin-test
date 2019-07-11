"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("pusher-js/node"));

var _EntitiesRepo = _interopRequireDefault(require("./EntitiesRepo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PUSHER_API_KEY = '75e6ef0fe5d39f481626';

var Loader =
/*#__PURE__*/
function () {
  function Loader(client) {
    var previewMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Loader);

    this.client = client;
    this.previewMode = previewMode;
    this.entitiesRepo = new _EntitiesRepo.default();
  }

  _createClass(Loader, [{
    key: "load",
    value: function load() {
      var _this = this;

      return Promise.all([this.client.get('/site', {
        include: 'item_types,item_types.fields'
      }), this.client.items.all({
        version: this.previewMode ? 'latest' : 'published'
      }, {
        deserializeResponse: false,
        allPages: true
      }), this.client.uploads.all({}, {
        deserializeResponse: false,
        allPages: true
      })]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            site = _ref2[0],
            items = _ref2[1],
            uploads = _ref2[2];

        _this.siteId = site.data.id;

        _this.entitiesRepo.upsertEntities(site, items, uploads);
      });
    }
  }, {
    key: "watch",
    value: function () {
      var _watch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(notifier) {
        var _this2 = this;

        var pusher, watcher, addEventListener, itemVersion, previewMode;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.siteId) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.load();

              case 3:
                pusher = new _node.default(PUSHER_API_KEY, {
                  authEndpoint: 'https://site-api.datocms.com/pusher/authenticate',
                  auth: {
                    headers: {
                      Authorization: "Bearer ".concat(this.client.rawClient.token),
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    }
                  }
                });
                watcher = pusher.subscribe("private-site-".concat(this.siteId));
                watcher.bind('pusher:subscription_error', function () {
                  process.stdout.write('Could not subscribe to the project live events... :(');
                });

                addEventListener = function addEventListener(eventName, entitiesRepoRefresher) {
                  watcher.bind(eventName, function (data) {
                    notifier(entitiesRepoRefresher(data));
                  });
                };

                itemVersion = this.previewMode ? 'latest' : 'published';
                previewMode = this.previewMode ? 'preview_mode' : 'published_mode';
                addEventListener('site:upsert',
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var _this2$entitiesRepo;

                  var payloads;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return Promise.all([_this2.client.get('/site', {
                            include: 'item_types,item_types.fields'
                          }), _this2.client.items.all({
                            version: itemVersion
                          }, {
                            deserializeResponse: false,
                            allPages: true
                          })]);

                        case 2:
                          payloads = _context.sent;

                          (_this2$entitiesRepo = _this2.entitiesRepo).upsertEntities.apply(_this2$entitiesRepo, _toConsumableArray(payloads));

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })));
                addEventListener("item:".concat(previewMode, ":upsert"),
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(_ref4) {
                    var ids, payload;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            ids = _ref4.ids;
                            _context2.next = 3;
                            return _this2.client.items.all({
                              'filter[ids]': ids.join(','),
                              version: itemVersion
                            }, {
                              deserializeResponse: false,
                              allPages: true
                            });

                          case 3:
                            payload = _context2.sent;

                            _this2.entitiesRepo.upsertEntities(payload);

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }());
                addEventListener("item:".concat(previewMode, ":destroy"), function (_ref6) {
                  var ids = _ref6.ids;

                  _this2.entitiesRepo.destroyEntities('item', ids);
                });
                addEventListener('upload:upsert',
                /*#__PURE__*/
                function () {
                  var _ref8 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(_ref7) {
                    var ids, payload;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            ids = _ref7.ids;
                            _context3.next = 3;
                            return _this2.client.uploads.all({
                              'filter[ids]': ids.join(',')
                            }, {
                              deserializeResponse: false,
                              allPages: true
                            });

                          case 3:
                            payload = _context3.sent;

                            _this2.entitiesRepo.upsertEntities(payload);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  return function (_x3) {
                    return _ref8.apply(this, arguments);
                  };
                }());
                addEventListener('upload:destroy', function (_ref9) {
                  var ids = _ref9.ids;

                  _this2.entitiesRepo.destroyEntities('upload', ids);
                });
                addEventListener('item_type:upsert',
                /*#__PURE__*/
                function () {
                  var _ref11 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee4(_ref10) {
                    var ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _this2$entitiesRepo2, id, payloads;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            ids = _ref10.ids;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context4.prev = 4;
                            _iterator = ids[Symbol.iterator]();

                          case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context4.next = 15;
                              break;
                            }

                            id = _step.value;
                            _context4.next = 10;
                            return Promise.all([_this2.client.itemTypes.find(id, {}, {
                              deserializeResponse: false
                            }), _this2.client.items.all({
                              'filter[type]': id,
                              version: itemVersion
                            }, {
                              deserializeResponse: false,
                              allPages: true
                            })]);

                          case 10:
                            payloads = _context4.sent;

                            (_this2$entitiesRepo2 = _this2.entitiesRepo).upsertEntities.apply(_this2$entitiesRepo2, _toConsumableArray(payloads));

                          case 12:
                            _iteratorNormalCompletion = true;
                            _context4.next = 6;
                            break;

                          case 15:
                            _context4.next = 21;
                            break;

                          case 17:
                            _context4.prev = 17;
                            _context4.t0 = _context4["catch"](4);
                            _didIteratorError = true;
                            _iteratorError = _context4.t0;

                          case 21:
                            _context4.prev = 21;
                            _context4.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                              _iterator.return();
                            }

                          case 24:
                            _context4.prev = 24;

                            if (!_didIteratorError) {
                              _context4.next = 27;
                              break;
                            }

                            throw _iteratorError;

                          case 27:
                            return _context4.finish(24);

                          case 28:
                            return _context4.finish(21);

                          case 29:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this, [[4, 17, 21, 29], [22,, 24, 28]]);
                  }));

                  return function (_x4) {
                    return _ref11.apply(this, arguments);
                  };
                }());
                addEventListener('item_type:destroy', function (_ref12) {
                  var ids = _ref12.ids;
                  ids.forEach(function (id) {
                    _this2.entitiesRepo.destroyItemType(id);
                  });
                });
                return _context5.abrupt("return", pusher.disconnect.bind(pusher));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function watch(_x) {
        return _watch.apply(this, arguments);
      };
    }()
  }]);

  return Loader;
}();

exports.default = Loader;