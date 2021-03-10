const express = require('express'); // Node web framework for handling HTTP requests
const morgan = require('morgan'); // logging middleware
const chalk = require('chalk');
const path = require('path'); // provides utilities for working with file and directory paths

const app = express(); // creates an Express application

const client = require('./db');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // raw json req.body
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded req.body

// GET /api/countries
app.get('/api/countries', async (req, res, next) => {
  try {
    const { rows: countries } = await client.query(`
      SELECT * FROM countries;
    `); // https://wesbos.com/destructuring-renaming
    res.send(countries);
  } catch (err) {
    next(err);
  }
});

// GET /api/cities
app.get('/api/cities', async (req, res, next) => {
  try {
    const { rows: cities } = await client.query(`
      SELECT ci.id,
             ci.name AS city,
             co.name AS country
      FROM cities AS ci
      JOIN countries AS co
        ON ci.country_id = co.id;
    `); // https://wesbos.com/destructuring-renaming
    res.send(cities);
  } catch (err) {
    next(err);
  }
});

// GET /api/countries/:id/cities
app.get('/api/countries/:id/cities', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: cities } = await client.query({
      name: 'fetch-country-cities',
      text: `
        SELECT co.name AS country,
               ci.id AS city_id,
               ci.name AS city
        FROM countries AS co
        JOIN cities AS ci
          ON co.id = ci.country_id
        WHERE co.id = $1
      `,
      values: [id]
    }); // https://wesbos.com/destructuring-renaming
    res.send(cities);
  } catch (err) {
    next(err);
  }
});

// GET /api/countries/:id
app.get('/api/countries/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      rows: [country]
    } = await client.query({
      name: 'fetch-country',
      text: 'SELECT * FROM countries WHERE id = $1;',
      values: [id]
    }); // https://wesbos.com/destructuring-renaming
    res.send(country);
  } catch (err) {
    next(err);
  }
});

// GET /api/cities/:id
app.get('/api/cities/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      rows: [city]
    } = await client.query({
      name: 'fetch-city',
      text: `
        SELECT ci.id,
               ci.name AS city,
               co.name AS country
        FROM cities AS ci
        JOIN countries AS co
          ON ci.country_id = co.id
        WHERE ci.id = $1;
      `,
      values: [id]
    }); // https://wesbos.com/destructuring-renaming
    res.send(city);
  } catch (err) {
    next(err);
  }
});

// POST /api/cities
app.post('/api/cities', (req, res, next) => {
  try {
    console.log(req.body);
    // ... create city in database...
    res.send(`
      Got data from form: ${req.body.cityName}, ${req.body.countryName}
    `);
  } catch (err) {
    next(err);
  }
});

// POST /api/countries
app.post('/api/countries', (req, res, next) => {
  try {
    console.log(req.body);
    // ... create country in database...
    res.send(`
      Got data from form: ${req.body.countryName}
    `);
  } catch (err) {
    next(err);
  }
});

// Error handling: Route doesn't exist, send 404
app.use((req, res) => {
  res.status(404).send('The route does not exist.');
});

app.listen(3000, (err) => {
  if (!err)
    console.log(chalk.blueBright('Listening --> http://localhost:3000'));
});

// Food for thought: https://stackoverflow.com/a/14934933
// console.log('\n---- APP STACK ----\n')
// console.log(app._router.stack)
// console.log('\n---- APP STACK END ----\n')
