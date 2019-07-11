"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ora = _interopRequireDefault(require("ora"));

var _progress = _interopRequireDefault(require("./progress"));

var _toApiKey = require("./toApiKey");

var _datoFieldTypeFor = _interopRequireDefault(require("./datoFieldTypeFor"));

var _datoLinkItemTypeFor = _interopRequireDefault(require("./datoLinkItemTypeFor"));

var _delay = _interopRequireDefault(require("./delay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var itemTypes, datoClient, contentfulData, spinner, contentTypes, fieldSize, progress, fieldsMapping, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            itemTypes = _ref.itemTypes, datoClient = _ref.datoClient, contentfulData = _ref.contentfulData;
            spinner = (0, _ora.default)('').start();
            contentTypes = contentfulData.contentTypes;
            fieldSize = contentTypes.map(function (contentType) {
              return contentType.fields.length;
            }).reduce(function (acc, length) {
              return acc + length;
            }, 0);
            progress = new _progress.default(fieldSize, 'Creating fields');
            spinner.text = progress.tick();
            fieldsMapping = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 10;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var contentType, contentTypeApiKey, itemType, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, contentfulField, position, validators, fieldAttributes, datoField;

              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      contentType = _step.value;
                      contentTypeApiKey = (0, _toApiKey.toItemApiKey)(contentType.sys.id);
                      fieldsMapping[contentTypeApiKey] = [];
                      itemType = itemTypes.find(function (iT) {
                        return iT.apiKey === contentTypeApiKey;
                      });
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context.prev = 7;
                      _iterator2 = contentType.fields[Symbol.iterator]();

                    case 9:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context.next = 41;
                        break;
                      }

                      contentfulField = _step2.value;
                      position = contentType.fields.indexOf(contentfulField);
                      validators = {};

                      if (contentfulField.type === 'Link' && contentfulField.linkType === 'Entry') {
                        validators = {
                          itemItemType: {
                            itemTypes: (0, _datoLinkItemTypeFor.default)({
                              itemTypes: itemTypes,
                              field: contentfulField
                            })
                          }
                        };
                      }

                      if (contentfulField.type === 'Array' && contentfulField.items.type === 'Link' && contentfulField.items.linkType === 'Entry') {
                        validators = {
                          itemsItemType: {
                            itemTypes: (0, _datoLinkItemTypeFor.default)({
                              itemTypes: itemTypes,
                              field: contentfulField.items
                            })
                          }
                        };
                      }

                      fieldAttributes = {
                        label: contentfulField.name,
                        fieldType: (0, _datoFieldTypeFor.default)(contentfulField),
                        localized: contentfulField.localized,
                        apiKey: (0, _toApiKey.toFieldApiKey)(contentfulField.id),
                        position: position,
                        validators: validators
                      };

                      if (contentfulField.id === contentType.displayField && contentfulField.type === 'Symbol') {
                        fieldAttributes.appeareance = {
                          editor: 'single_line',
                          parameters: {
                            heading: true
                          },
                          addons: []
                        };
                      }

                    case 17:
                      if (!true) {
                        _context.next = 38;
                        break;
                      }

                      _context.prev = 18;
                      _context.next = 21;
                      return datoClient.fields.create(itemType.id, fieldAttributes);

                    case 21:
                      datoField = _context.sent;
                      spinner.text = progress.tick();
                      fieldsMapping[contentTypeApiKey].push(datoField);
                      return _context.abrupt("break", 38);

                    case 27:
                      _context.prev = 27;
                      _context.t0 = _context["catch"](18);

                      if (!(!_context.t0.body || !_context.t0.body.data || !_context.t0.body.data.some(function (d) {
                        return d.id === 'BATCH_DATA_VALIDATION_IN_PROGRESS';
                      }))) {
                        _context.next = 34;
                        break;
                      }

                      spinner.fail(_context.t0);
                      process.exit();
                      _context.next = 36;
                      break;

                    case 34:
                      _context.next = 36;
                      return (0, _delay.default)(1000);

                    case 36:
                      _context.next = 17;
                      break;

                    case 38:
                      _iteratorNormalCompletion2 = true;
                      _context.next = 9;
                      break;

                    case 41:
                      _context.next = 47;
                      break;

                    case 43:
                      _context.prev = 43;
                      _context.t1 = _context["catch"](7);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context.t1;

                    case 47:
                      _context.prev = 47;
                      _context.prev = 48;

                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }

                    case 50:
                      _context.prev = 50;

                      if (!_didIteratorError2) {
                        _context.next = 53;
                        break;
                      }

                      throw _iteratorError2;

                    case 53:
                      return _context.finish(50);

                    case 54:
                      return _context.finish(47);

                    case 55:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, this, [[7, 43, 47, 55], [18, 27], [48,, 50, 54]]);
            });
            _iterator = contentTypes[Symbol.iterator]();

          case 13:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 18;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 15);

          case 15:
            _iteratorNormalCompletion = true;
            _context2.next = 13;
            break;

          case 18:
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 24:
            _context2.prev = 24;
            _context2.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 27:
            _context2.prev = 27;

            if (!_didIteratorError) {
              _context2.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context2.finish(27);

          case 31:
            return _context2.finish(24);

          case 32:
            spinner.succeed();
            return _context2.abrupt("return", fieldsMapping);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this, [[10, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;