// express.js (our Node framework)
const express = require('express')
const app = express()
// morgan (HTTP request logger middleware)
const morgan = require('morgan')
// path (safer to use absolute path of directory to serve)
const path = require('path')

const countriesRoutes = require('./countriesRoutes')
const citiesRoutes = require('./citiesRoutes')

// `app.use` is a method to configure middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false })) // body parsing data

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

app.use('/countries', countriesRoutes)
app.use('/cities', citiesRoutes)

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
