"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getGalleryCards = getGalleryCards;

var _galleryData = _interopRequireDefault(require("../data/galleryData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = require("node-fetch");

async function getGalleryCards(req, res) {
  try {
    const data = JSON.stringify(_galleryData.default);
    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json();
  }
}

var _default = getGalleryCards;
exports.default = _default;