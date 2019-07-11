"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = media;

var _allPages = _interopRequireDefault(require("../utils/allPages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../utils/progress'),
    progress = _require.progress;

function media(_x, _x2) {
  return _media.apply(this, arguments);
}

function _media() {
  _media = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(dato, wp) {
    var ids, urls, mediaItems, tick, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ids = {};
            urls = {};
            _context3.next = 4;
            return (0, _allPages.default)('Fetching media', wp.media());

          case 4:
            mediaItems = _context3.sent;
            tick = progress('Creating media', mediaItems.length);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 9;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var mediaItem, create;
              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      mediaItem = _step.value;

                      create =
                      /*#__PURE__*/
                      function () {
                        var _ref = _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee() {
                          var mediaItemUrl, uploadId, upload, _arr, _i, thumbName, _mediaItem$media_deta, width, height, sourceUrl;

                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  mediaItemUrl = mediaItem.source_url;
                                  _context.prev = 1;
                                  _context.next = 4;
                                  return dato.uploadFile(mediaItemUrl);

                                case 4:
                                  uploadId = _context.sent;
                                  _context.next = 7;
                                  return dato.uploads.update(uploadId, {
                                    title: mediaItem.title.rendered,
                                    alt: mediaItem.alt_text
                                  });

                                case 7:
                                  upload = _context.sent;
                                  ids[mediaItem.id] = uploadId;
                                  urls[mediaItemUrl] = upload.url;

                                  if (mediaItem.media_details && mediaItem.media_details.sizes) {
                                    _arr = Object.keys(mediaItem.media_details.sizes);

                                    for (_i = 0; _i < _arr.length; _i++) {
                                      thumbName = _arr[_i];
                                      _mediaItem$media_deta = mediaItem.media_details.sizes[thumbName], width = _mediaItem$media_deta.width, height = _mediaItem$media_deta.height, sourceUrl = _mediaItem$media_deta.source_url;
                                      urls[sourceUrl] = "".concat(upload.url, "?w=").concat(width, "&h=").concat(height, "&fit=crop");
                                    }
                                  }

                                  _context.next = 17;
                                  break;

                                case 13:
                                  _context.prev = 13;
                                  _context.t0 = _context["catch"](1);
                                  console.log("Cannot import: ".concat(mediaItemUrl));
                                  console.log(_context.t0);

                                case 17:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee, this, [[1, 13]]);
                        }));

                        return function create() {
                          return _ref.apply(this, arguments);
                        };
                      }();

                      _context2.next = 4;
                      return tick(mediaItem.title.rendered, create());

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, this);
            });
            _iterator = mediaItems[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 17;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 14);

          case 14:
            _iteratorNormalCompletion = true;
            _context3.next = 12;
            break;

          case 17:
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t1 = _context3["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 23:
            _context3.prev = 23;
            _context3.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 26:
            _context3.prev = 26;

            if (!_didIteratorError) {
              _context3.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context3.finish(26);

          case 30:
            return _context3.finish(23);

          case 31:
            return _context3.abrupt("return", {
              ids: ids,
              urls: urls
            });

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, this, [[9, 19, 23, 31], [24,, 26, 30]]);
  }));
  return _media.apply(this, arguments);
}