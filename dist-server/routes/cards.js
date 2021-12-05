"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cardsController = _interopRequireDefault(require("../controllers/cardsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.default)();
router.route("/").post(_cardsController.default);
var _default = router;
exports.default = _default;