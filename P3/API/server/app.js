var express = require('express')
import bodyParser from 'body-parser'

import routes from './routes'
import yelpController from './controllers/yelpController'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use((req, res, next) => {
  next()
})

app.use('/api', routes)

app.post('/', yelpController.postSearch)

export default app
