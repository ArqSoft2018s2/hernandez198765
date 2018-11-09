"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _ApiConstants = _interopRequireDefault(require("../helpers/ApiConstants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PAY_YOU_NOW_API = _ApiConstants.default.PAY_YOU_NOW_API;

var HttpService =
/*#__PURE__*/
function () {
  function HttpService() {
    _classCallCheck(this, HttpService);

    this.axios = _axios.default.create({
      baseURL: PAY_YOU_NOW_API
    });
  }

  _createClass(HttpService, [{
    key: "get",
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.axios.get(url, {
        params: params
      });
    }
  }, {
    key: "post",
    value: function post(url, body) {
      return this.axios.post(url, body);
    }
  }, {
    key: "put",
    value: function put(url, body) {
      return this.axios.put(url, body);
    }
  }, {
    key: "patch",
    value: function patch(url, body) {
      return this.axios.patch(url, body);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      return this.axios.delete(url);
    }
  }]);

  return HttpService;
}();

var _default = new HttpService();

exports.default = _default;