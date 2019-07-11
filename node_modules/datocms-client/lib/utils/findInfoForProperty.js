"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findInfoForProperty;

function findInfoForProperty(propertyName, schema) {
  if (!schema || !schema.properties.data) {
    return null;
  }

  var property;

  if (schema.properties.data.type === 'array') {
    property = schema.properties.data.items.properties[propertyName];
  } else {
    property = schema.properties.data.properties[propertyName];
  }

  return property;
}