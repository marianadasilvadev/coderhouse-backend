const http = require('http')
const path = require('path')

const express = require('express')
const { engine } = require('express-handlebars')

const websocketConnection = require('./websocket/index')

const viewsRoutes = require('./routes/views.router')
const productsRoutes = require('./routes/products.router')

const app = express()

// Express config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static config
app.use('/static', express.static(path.join(`${__dirname}/public`)))

// Handlebars config
app.engine('handlebars', engine())
app.set('views', path.join(`${__dirname}/views`))
app.set('view engine', 'handlebars')

// Routes config
app.use('/views', viewsRoutes)
app.use('/api/products', productsRoutes)

const server = http.createServer(app)

// Websocket config
websocketConnection.startConnection(server)


module.exports = server
