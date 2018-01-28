'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yelpFusion = require('yelp-fusion');

var _yelpFusion2 = _interopRequireDefault(_yelpFusion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = 'gdrsso4F906v3Ruga2nslfMGe20d0A7cRqarZ_qNcrnv_2nsEIKcnAQ0cXb_uv4xR_l23yCJzwEIibr4_LXGVNvC8NFuMRtHeKZ-0L1nTkm2ArgEuLn2PCKq65Z7WXYx';
var yelpClient = (0, _yelpFusion.client)(token);
var testToken = function testToken(req, res) {
  (0, _yelpFusion.accessToken)('OmdFAJteGTt9UbUQTX_ocw', 'f9BCkJhhCK7gts2zIB9OnHDW3a5bfyn7wa0OwZwCvGBNVzyL8GEX1vgG33lWIK1r').then(function (response) {
    token = response.jsonBody.access_token;
  }).catch(function (e) {
    console.log(e);
  });
};
testToken();
var yelpController = {};

yelpController.postSearch = function (req, res) {

  console.log(req.body);
  yelpClient.search({
    term: req.body.term,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    radius: req.body.radius,
    limit: req.body.limit
  }).then(function (response) {
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    res.json({
      yelp: response.jsonBody.businesses
    });
  }).catch(function (e) {
    console.log(e);
  });
};

//yelpController.postSearch = (req, res) => {
//  yelpClient.search({
//    term: 'fine dinner',
//    location: 'new york',
//    sort_by: 'best_match',
//    price: '',
//    limit: 21
//  }).then(response => {
//    res.json({
//      yelp: response.jsonBody.businesses
//    })
//  }).catch(e => {
//    console.log(e)
//  })
//}

exports.default = yelpController;
//# sourceMappingURL=yelpController.js.map