"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = article;

var _slug = _interopRequireDefault(require("./fields/slug"));

var _text = _interopRequireDefault(require("./fields/text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function article(_x, _x2, _x3, _x4) {
  return _article.apply(this, arguments);
}

function _article() {
  _article = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dato, authorId, categoryId, tagId) {
    var itemType, _arr, _i, apiKey;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dato.itemTypes.create({
              apiKey: 'article',
              draftModeActive: true,
              name: 'Article'
            });

          case 2:
            itemType = _context.sent;
            _context.next = 5;
            return (0, _slug.default)(itemType, dato, 'title');

          case 5:
            _arr = ['excerpt', 'content'];
            _i = 0;

          case 7:
            if (!(_i < _arr.length)) {
              _context.next = 14;
              break;
            }

            apiKey = _arr[_i];
            _context.next = 11;
            return (0, _text.default)(itemType, dato, apiKey);

          case 11:
            _i++;
            _context.next = 7;
            break;

          case 14:
            _context.next = 16;
            return dato.fields.create(itemType.id, {
              apiKey: 'featured_media',
              fieldType: 'file',
              label: 'Main image',
              validators: {}
            });

          case 16:
            _context.next = 18;
            return dato.fields.create(itemType.id, {
              apiKey: 'author',
              fieldType: 'link',
              label: 'Author',
              validators: {
                itemItemType: {
                  itemTypes: [authorId]
                }
              }
            });

          case 18:
            _context.next = 20;
            return dato.fields.create(itemType.id, {
              apiKey: 'categories',
              fieldType: 'links',
              label: 'Categories',
              validators: {
                itemsItemType: {
                  itemTypes: [categoryId]
                }
              }
            });

          case 20:
            _context.next = 22;
            return dato.fields.create(itemType.id, {
              apiKey: 'tags',
              fieldType: 'links',
              label: 'Tags',
              validators: {
                itemsItemType: {
                  itemTypes: [tagId]
                }
              }
            });

          case 22:
            _context.next = 24;
            return dato.fields.create(itemType.id, {
              apiKey: 'date',
              fieldType: 'date',
              label: 'Date',
              validators: {
                required: {}
              }
            });

          case 24:
            return _context.abrupt("return", itemType.id);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _article.apply(this, arguments);
}