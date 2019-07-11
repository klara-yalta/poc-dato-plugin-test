"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uploadFile;
var rawUploadFile = process.browser ? require('./adapters/browser').default : require('./adapters/node').default;

function uploadFile(client, source) {
  return rawUploadFile(client, source).then(function (attributes) {
    return client.uploads.create(attributes);
  }).then(function (upload) {
    return Promise.resolve(upload.id);
  });
}