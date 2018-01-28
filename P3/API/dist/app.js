'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _yelpController = require('./controllers/yelpController');

var _yelpController2 = _interopRequireDefault(_yelpController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');


var app = express();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  next();
});

app.use('/api', _routes2.default);

app.post('/', _yelpController2.default.postSearch);

exports.default = app;
//# sourceMappingURL=app.js.map