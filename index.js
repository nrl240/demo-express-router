// express.js (our Node framework)
const express = require('express')
const app = express()
// morgan (HTTP request logger middleware)
const morgan = require('morgan')
// path (safer to use absolute path of directory to serve)
const path = require('path')

// Mock database
const { countries, cities } = require('./data.js')

// `app.use` is a method to configure middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// GET /
app.get('/', (req, res, next) => {
  res.send(`
    <h1>Travel Guides</h1>
    <ul>
      <li><a href="/countries">Countries</a></li>
      <li><a href="/cities">Cities</a></li>
    </ul>
  `)
})

// GET /countries
app.get('/countries', (req, res, next) => {
  // res.send(countries) // demo JSON then comment out

  const countriesList = countries.map(country => (
    `<li><a href="/countries/${country.name}">${country.name}</a></li>`
  )).join('')

  res.send(`
    <h2>Countries</h2>
    <ul>
      ${countriesList}
    </ul>
    <br/><br/>
    <a href="/">Home</a>
  `)
})

// GET /countries/:countryName
app.get('/countries/:countryName', (req, res, next) => {
  const { countryName } = req.params
  const exploreCountryLink = `
    <a href="/countries/${countryName}/cities">Explore ${countryName} Cities!</a>
  `
  res.send(`
    <h2>${exploreCountryLink}</h2>
    <p>It's such a beautiful country!</p>
    <br/><br/>
    <a href="/countries">Back</a> | <a href="/">Home</a>
  `)
})

// GET /countries/:countryName/cities
app.get('/countries/:countryName/cities', (req, res, next) => {
  const { countryName } = req.params

  const country = countries.filter(country => country.name === countryName)[0]
  const citiesList = country.cities.map(city => (
      `<li><a href="/cities/${city}">${city}</a></li>`
    ))
    .join('')

  res.send(`
    <h2>${countryName}'s Cities</h2>
    ${citiesList}
    <br/><br/>
    <a href="/countries/${countryName}">Back</a> | <a href="/">Home</a>
  `)
})

// GET /cities
app.get('/cities', (req, res, next) => {
  const citiesList = cities.map(city => (
    `<li>
      <a href="/cities/${city.name}">${city.name}</a>
    </li>
  `)).join('')

  res.send(`
    <h2>Cities</h2>
    <ul>
      ${citiesList}
    </ul>
    <br/><br/>
    <a href="/">Home</a>
  `)
})

// GET /cities/:cityName
app.get('/cities/:cityName', (req, res, next) => {
  // const { cityName } = req.params
  res.send(`
    <h2>Explore ${req.params.cityName}!</h2>
    <p>It's such a beautiful city!</p>
    <br/><br/>
    <a href="/cities">Back</a> | <a href="/">Home</a>
  `)
})

// 404 Handler
app.use((req, res) => {
  res.status(404).send(`
    <h2>You look lost... go <a href="/">home</a>.</h2>
  `)
})

app.listen(3000, (err) => {
  if (!err) console.log('Listening on PORT 3000')
})



// Food for thought: https://stackoverflow.com/a/14934933
// console.log('\n---- APP STACK ----\n')
// console.log(app._router.stack)
// console.log('\n---- APP STACK END ----\n')
