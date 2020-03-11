const countries = [ {
    id: 1,
    name: 'Denmark',
    cities: [ 'Copenhagen', 'Frederiksberg' ]
  }, {
    id: 2,
    name: 'Italy',
    cities: [ 'Florence', 'Trieste' ]
  }, {
    id: 3,
    name: 'Portugal',
    cities: [ 'Lisbon', 'Porto' ]
  }, {
    id: 4,
    name: 'Spain',
    cities: [ 'Madrid', 'Valencia' ]
  }
]

const cities = [ {
    id: 1,
    name: 'Copenhagen',
    country: 'Denmark'
  }, {
    id: 2,
    name: 'Frederiksberg',
    country: 'Denmark'
  }, {
    id: 3,
    name: 'Florence',
    country: 'Italy'
  }, {
    id: 4,
    name: 'Trieste',
    country: 'Italy'
  }, {
    id: 5,
    name: 'Lisbon',
    country: 'Portugal'
  }, {
    id: 6,
    name: 'Porto',
    country: 'Portugal'
  }, {
    id: 7,
    name: 'Madrid',
    country: 'Spain'
  }, {
    id: 8,
    name: 'Valencia',
    country: 'Spain'
  }
]

module.exports = {
  countries,
  cities
}
