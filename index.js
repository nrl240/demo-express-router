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

app.get('/api/countries', async (req, res, next) => {
  try {
    const { rows: countries } = await client.query(`
      SELECT * FROM countries;
    `); // https://wesbos.com/destructuring-renaming
    res.send(countries);
  } catch (err) {
    next();
  }
});

app.get('/api/cities', async (req, res, next) => {
  try {
    const { rows: cities } = await client.query(`
      SELECT ci.id, ci.name AS city, co.name AS country
      FROM cities AS ci
      JOIN countries AS co ON ci.country_id = co.id;
    `); // https://wesbos.com/destructuring-renaming
    res.send(cities);
  } catch (err) {
    next();
  }
});

app.get('/api/countries/:countryName/cities', async (req, res, next) => {
  const { countryName } = req.params;
  try {
    const { rows: country } = await client.query({
      name: 'fetch-country',
      text: `
        SELECT co.name AS country, ci.id AS city_id, ci.name AS city
        FROM countries AS co
        JOIN cities AS ci ON co.id = ci.country_id
        WHERE lower(co.name) = $1
      `,
      values: [countryName]
    }); // https://wesbos.com/destructuring-renaming
    res.send(country);
  } catch (err) {
    next();
  }
});

app.get('/api/countries/:countryName', async (req, res, next) => {
  const { countryName } = req.params;
  try {
    const { rows: country } = await client.query({
      name: 'fetch-country',
      text: 'SELECT * FROM countries WHERE lower(name) = $1;',
      values: [countryName]
    }); // https://wesbos.com/destructuring-renaming
    res.send(country);
  } catch (err) {
    next();
  }
});

app.get('/api/cities/:cityName', async (req, res, next) => {
  const { cityName } = req.params;
  try {
    const { rows: city } = await client.query({
      name: 'fetch-city',
      text: `
        SELECT ci.id, ci.name AS city, co.name AS country
        FROM cities AS ci
        JOIN countries AS co ON ci.country_id = co.id
        WHERE lower(ci.name) = $1;
      `,
      values: [cityName]
    }); // https://wesbos.com/destructuring-renaming
    res.send(city);
  } catch (err) {
    next();
  }
});

app.post('/api/cities', (req, res, next) => {
  console.log(req.body);
  // ... create city in database...
  res.send(`
    Got data from form: ${req.body.cityName}, ${req.body.countryName}
  `);
});

app.post('/api/countries', (req, res, next) => {
  console.log(req.body);
  // ... create country in database...
  res.send(`
    Got data from form: ${req.body.countryName}
  `);
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
