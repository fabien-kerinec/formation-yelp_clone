import yelp, { client, accessToken  } from 'yelp-fusion'

let token = 'gdrsso4F906v3Ruga2nslfMGe20d0A7cRqarZ_qNcrnv_2nsEIKcnAQ0cXb_uv4xR_l23yCJzwEIibr4_LXGVNvC8NFuMRtHeKZ-0L1nTkm2ArgEuLn2PCKq65Z7WXYx'
const yelpClient = client(token)
const testToken = (req, res) => {
  accessToken('OmdFAJteGTt9UbUQTX_ocw', 'f9BCkJhhCK7gts2zIB9OnHDW3a5bfyn7wa0OwZwCvGBNVzyL8GEX1vgG33lWIK1r')
  .then(response => {
    token = response.jsonBody.access_token;
  }).catch(e => {
    console.log(e)
  })
}
testToken();
const yelpController = {}

yelpController.postSearch = (req, res) => {
  
  console.log(req.body)
  yelpClient.search({
    term: req.body.term,
    latitude: req.body.latitude,
    longitude : req.body.longitude,
    radius : req.body.radius,
    limit : req.body.limit
  }).then(response => {
    console.log(req.body.latitude);
    console.log(req.body.longitude)
    res.json({
      yelp: response.jsonBody.businesses
    })
  }).catch(e => {
    console.log(e)
  })
}


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

export default yelpController
