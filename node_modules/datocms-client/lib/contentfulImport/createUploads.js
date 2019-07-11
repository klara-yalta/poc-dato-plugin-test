"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

var _toApiKey = require("./toApiKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('humps'),
    camelize = _require.camelize;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var fieldsMapping, datoClient, contentfulData, contentfulRecordMap, spinner, entries, assets, defaultLocale, progress, contentfulAssetsMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, asset, fileAttributes, fileUrl, datoUpload, upload, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, entry, datoItemId, recordAttributes, _arr, _loop, _i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fieldsMapping = _ref.fieldsMapping, datoClient = _ref.datoClient, contentfulData = _ref.contentfulData, contentfulRecordMap = _ref.contentfulRecordMap;
            spinner = (0, _ora.default)('').start();
            entries = contentfulData.entries, assets = contentfulData.assets, defaultLocale = contentfulData.defaultLocale;
            progress = new _progress.default(assets.length, 'Uploading assets');
            spinner.text = progress.tick();
            contentfulAssetsMap = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = assets[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 39;
              break;
            }

            asset = _step.value;

            if (!(asset.fields && asset.fields.file)) {
              _context.next = 35;
              break;
            }

            fileAttributes = asset.fields.file[defaultLocale];
            fileUrl = "https:".concat(fileAttributes.url);
            datoUpload = void 0;
            upload = void 0;
            _context.prev = 18;
            _context.next = 21;
            return datoClient.uploadFile(fileUrl);

          case 21:
            datoUpload = _context.sent;
            _context.next = 24;
            return datoClient.uploads.update(datoUpload, {
              title: fileAttributes.fileName,
              alt: fileAttributes.fileName
            });

          case 24:
            upload = _context.sent;
            contentfulAssetsMap[asset.sys.id] = upload.id;
            spinner.text = progress.tick();
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](18);

            if (_context.t0.body && _context.t0.body.data && _context.t0.body.data.some(function (d) {
              return d.id === 'FILE_STORAGE_QUOTA_EXCEEDED';
            })) {
              spinner.fail('You\'ve reached your site\'s plan storage limit: upgrade to complete the import');
            } else {
              spinner.fail(_context.t0);
            }

            process.exit();

          case 33:
            _context.next = 36;
            break;

          case 35:
            spinner.text = progress.tick();

          case 36:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 39:
            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 45:
            _context.prev = 45;
            _context.prev = 46;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 48:
            _context.prev = 48;

            if (!_didIteratorError) {
              _context.next = 51;
              break;
            }

            throw _iteratorError;

          case 51:
            return _context.finish(48);

          case 52:
            return _context.finish(45);

          case 53:
            spinner.succeed();
            spinner = (0, _ora.default)('').start();
            progress = new _progress.default(entries.length, 'Linking assets to records');
            spinner.text = progress.tick();
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 60;
            _iterator2 = entries[Symbol.iterator]();

          case 62:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 82;
              break;
            }

            entry = _step2.value;
            datoItemId = contentfulRecordMap[entry.sys.id];
            recordAttributes = {};
            _context.prev = 66;
            _arr = Object.keys(entry.fields);

            _loop = function _loop() {
              var key = _arr[_i];
              var entryFieldValue = entry.fields[key];
              var contentTypeApiKey = (0, _toApiKey.toItemApiKey)(entry.sys.contentType.sys.id);
              var apiKey = (0, _toApiKey.toFieldApiKey)(key);
              var field = fieldsMapping[contentTypeApiKey].find(function (f) {
                return f.apiKey === apiKey;
              });
              var uploadedFile = null;

              if (field.fieldType === 'file' || field.fieldType === 'gallery') {
                if (field.localized) {
                  var localizedValue = Object.keys(entryFieldValue).reduce(function (innerAcc, locale) {
                    var innerValue = entryFieldValue[locale];

                    if (field.fieldType === 'file') {
                      return Object.assign(innerAcc, _defineProperty({}, locale.slice(0, 2), contentfulAssetsMap[innerValue.sys.id]));
                    }

                    return Object.assign(innerAcc, _defineProperty({}, locale.slice(0, 2), innerValue.map(function (link) {
                      return contentfulAssetsMap[link.sys.id];
                    })));
                  }, {});
                  var fallbackValues = contentfulData.locales.reduce(function (innerAcc, locale) {
                    return Object.assign(innerAcc, _defineProperty({}, locale.slice(0, 2), localizedValue[defaultLocale.slice(0, 2)]));
                  }, {});
                  recordAttributes = Object.assign(recordAttributes, _defineProperty({}, camelize(apiKey), _objectSpread({}, fallbackValues, localizedValue)));
                } else {
                  var innerValue = entryFieldValue[defaultLocale];

                  switch (field.fieldType) {
                    case 'file':
                      uploadedFile = contentfulAssetsMap[innerValue.sys.id];
                      break;

                    case 'gallery':
                      uploadedFile = innerValue.map(function (link) {
                        return contentfulAssetsMap[link.sys.id];
                      });
                      break;

                    default:
                      break;
                  }

                  recordAttributes = Object.assign(recordAttributes, _defineProperty({}, camelize(apiKey), uploadedFile));
                }
              }
            };

            for (_i = 0; _i < _arr.length; _i++) {
              _loop();
            }

            _context.next = 72;
            return datoClient.items.update(datoItemId, recordAttributes);

          case 72:
            spinner.text = progress.tick();
            _context.next = 79;
            break;

          case 75:
            _context.prev = 75;
            _context.t2 = _context["catch"](66);
            spinner.fail(_context.t2);
            process.exit();

          case 79:
            _iteratorNormalCompletion2 = true;
            _context.next = 62;
            break;

          case 82:
            _context.next = 88;
            break;

          case 84:
            _context.prev = 84;
            _context.t3 = _context["catch"](60);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t3;

          case 88:
            _context.prev = 88;
            _context.prev = 89;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 91:
            _context.prev = 91;

            if (!_didIteratorError2) {
              _context.next = 94;
              break;
            }

            throw _iteratorError2;

          case 94:
            return _context.finish(91);

          case 95:
            return _context.finish(88);

          case 96:
            spinner.succeed();

          case 97:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 41, 45, 53], [18, 29], [46,, 48, 52], [60, 84, 88, 96], [66, 75], [89,, 91, 95]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;