const pg = require('pg');
const client = new pg.Client('postgres://localhost/countries');

client.connect();

module.exports = client;
