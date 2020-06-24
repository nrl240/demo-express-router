# Demonstrating Express.js `Router()` and RESTful API

## **Live Code**

### **Step 1** - Scaffold `Router()` routes

- Create a `routes.js` file
- Demonstrate creating a new Express app instance and prompt students:
  - What would be wrong with initializing a new application?
  ```js
  const express = require('express')
  const app = express()
  ```
- Introduce [`Router()`](https://expressjs.com/en/4x/api.html#router)
  - A `router` object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
  ```js
  const router = require('express').Router()
  ```
- Copy and paste all of the routes from the `app.js` file
  - Update `app` to `router`
- Export the router
  ```js
  module.exports = router
  ```

### **Step 2** - Refactor `app.js`

- Near the top of the `app.js` file, import in the routes using `require`
  ```js
  const routes = require('./routes.js')
  ```
- **Use** the routes
  ```js
  app.use(routes)
  ```
- For further granularity, we can break the routes file into two separate files. In this case, we would have to require them both in then.
  - `countriesRouter.js`
  - `citiesRouter.js`
  ```js
  app.use('/countries', require('./countriesRouter.js'))
  app.use('/cities', require('./citiesRouter.js'))
  ```

### **Step 3** - Using body-parsing middleware

- `POST` requests/routes are designated for ***creating*** something. For example, let's say we want to create a new `city`. We can send some data to do so in our HTTP request message in a couple of ways:
  - Form data (URL encoded) is sent as strings or arrays, which we must use Express' `app.use(express.urlencoded({ extended: false }))` to parse easily.
  - JSON object, which we must use Express' `app.use(express.json())` to parse easily.
- Demonstrate using Postman
