"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = localizedRead;

function localizedRead(entity, key, localized, i18n) {
  if (localized) {
    var hash = entity[key];
    var fallbacks = i18n.fallbacks || {};
    var locales = [i18n.locale].concat(fallbacks[i18n.locale] || []);
    var localeWithValue = locales.find(function (locale) {
      return hash[locale];
    });
    return localeWithValue ? hash[localeWithValue] : null;
  }

  return entity[key];
}