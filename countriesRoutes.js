const router = require('express').Router()
const { countries } = require('./data.js')

router.get('/', (req, res, next) => {

  res.send(countries) // demo JSON then comment out

  const countriesList = countries.map(country => (
    `<li><a href="/countries/${country.name}">${country.name}</a></li>`
  )).join('')

  res.send(`
    <html>
      <head>
        <title>demo-express-routing</title>
      </head>
      <body>
        <h2>Countries</h2>
        <ul>
          ${countriesList}
        </ul>
        <a href="/">Home</a>
      </body>
    </html>
  `)
})

router.get('/:countryName', (req, res, next) => {
  const { countryName } = req.params
  const countryLink = `
    <a href="/countries/${countryName}/cities">${countryName}</a>
  `
  res.send(`Explore ${countryLink}'s cities!`)
})

router.get('/:countryName/cities', (req, res, next) => {
  const { countryName } = req.params

  const country = countries.filter(country => country.name === countryName)[0]
  const citiesList = country.cities.map(city => (
      `<li><a href="/cities/${city}">${city}</a></li>`
    ))
    .join('')

  res.send(citiesList)
})

module.exports = router
