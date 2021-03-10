// [Prompt class] If we do the following first, what would be wrong with it?
// What's wrong with initializing a new application?
const express = require('express'); // After response, comment out
const app = express(); // After response, comment out

// (1) TODO
// const router = require('express').Router()

// (2) PASTE FROM INDEX.JS
// router.get('/', (req, res, next) => {
//   res.send(`
//     <html>
//       <head>
//         <title>demo-express-routing</title>
//       </head>
//       <body>
//         <h2>Travel Guides</h2>
//         <ul>
//           <li>Countries</li>
//           <li><a href="/cities">Cities</a></li>
//         </ul>
//       </body>
//     </html>
//   `)
// })

// router.get('/cities', (req, res, next) => {
//   res.send(`
//     <html>
//       <head>
//         <title>demo-express-routing</title>
//       </head>
//       <body>
//         <h2>Cities</h2>
//         <ul>
//           <li><a href="/cities/copenhagen">Copenhagen</a></li>
//           <li><a href="/cities/madrid">Madrid</a></li>
//           <li><a href="/cities/porto">Porto</a></li>
//           <li><a href="/cities/trieste">Trieste</a></li>
//         </ul>
//         <a href="/">Home</a>
//       </body>
//     </html>
//   `)
// })

// router.get('/cities/:cityName', (req, res, next) => {
//   // const { cityName } = req.params
//   res.send(`Explore ${req.params.cityName}!`)
// })

// router.post('/cities', (req, res, next) => {
//   console.log('req.body -->', req.body)
//   res.send(`Got data from form: ${req.body.cityName}, ${req.body.countryName}`)
// })

// router.get('/cities/new', (req, res, next) => {
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

// (3) TODO (LAST STEP)
// module.exports = router

// // Food for thought: https://stackoverflow.com/a/14934933
// console.log('\n---- ROUTER STACK ----\n')
// // console.log(router.stack)
// console.log(router.stack
//   .filter(r => r.route)
//   .map(r => r.route.path)
// )
// console.log('\n---- ROUTER STACK END ----\n')
