// express.js (our Node framework)
const express = require('express')
const app = express()
// morgan (HTTP request logger middleware)
const morgan = require('morgan')
// path (safer to use absolute path of directory to serve)
const path = require('path')

// Mock database
const { countries, cities } = require('./data.js')

// (4) TODO
// const routes = require('./routes.js')

// `app.use` is a method to configure middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// (7) TODO (AFTER BODY PARSER SLIDES)
app.use(express.urlencoded({ extended: false }))

// Our current routes that will be copied/pasted into routes.js
app.get('/', (req, res, next) => {
  res.send(`
    <html>
      <head>
        <title>demo-express-routing</title>
      </head>
      <body>
        <h2>Travel Guides</h2>
        <ul>
          <li><a href="/countries">Countries</a></li>
          <li><a href="/cities">Cities</a></li>
        </ul>
      </body>
    </html>
  `)
})

app.get('/countries', (req, res, next) => {

  // res.send(countries) // demo JSON then comment out

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

app.get('/countries/:countryName', (req, res, next) => {
  const { countryName } = req.params
  const countryLink = `
    <a href="/countries/${countryName}/cities">${countryName}</a>
  `
  res.send(`Explore ${countryLink}'s cities!`)
})

app.get('/countries/:countryName/cities', (req, res, next) => {
  const { countryName } = req.params

  const country = countries.filter(country => country.name === countryName)[0]
  const citiesList = country.cities.map(city => (
      `<li><a href="/cities/${city}">${city}</a></li>`
    ))
    .join('')

  res.send(citiesList)
})

app.get('/cities', (req, res, next) => {
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

app.get('/cities/:cityName', (req, res, next) => {
  // const { cityName } = req.params
  res.send(`
    Explore ${req.params.cityName}!
    <br/><br/>
    <a href="/">Home</a>
  `)
})

// (8) TODO (demo with Postman)
app.post('/cities', (req, res, next) => {
  console.log('req.body -->', req.body)
  res.send(`Got data from form: ${req.body.cityName}, ${req.body.countryName}`)
})

// IGNORE
// app.get('/cities/new', (req, res, next) => {
//   res.send(`
//   <html>
//     <head>
//       <title>demo-express-routing</title>
//     </head>
//     <body>
//       <h2>Add a new city:</h2>
//       <form method="post" action="/cities">
//         City: <input type="text" name="cityName" /><br/>
//         Country: <input type="text" name="countryName" /><br/>
//         <button type="submit">Submit</button>
//       </form>
//     </body>
//   </html>
//   `)
// })
// IGNORE END

// (5) TODO
// app.use(routes)

// (6) TODO (further granularity)
// app.use('/countries', require('./countriesRouter.js'))
// app.use('/cities', require('./citiesRouter.js'))

// Not found route
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
