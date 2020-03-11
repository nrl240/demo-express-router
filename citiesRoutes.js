const router = require('express').Router()
const { cities } = require('./data.js')

router.get('/', (req, res, next) => {
  const citiesList = cities.map(city => (
    `<li><a href="/cities/${city.name}">${city.name}</a></li>`
  )).join('')

  res.send(`
    <html>
      <head>
        <title>demo-express-routing</title>
      </head>
      <body>
        <h2>Cities</h2>
        <ul>
          ${citiesList}
        </ul>
        <a href="/">Home</a>
      </body>
    </html>
  `)
})

router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params
  res.send(`
    Explore ${cityName}!
    <br/><br/>
    <a href="/">Home</a>
  `)
})

router.post('/', (req, res, next) => {
  console.log('req.body -->', req.body)
  res.send('good job')
  // res.send(`Got data from form: ${req.body.cityName}, ${req.body.countryName}`)
})

module.exports = router
