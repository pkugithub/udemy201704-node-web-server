const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

const app = express();

// register stuff
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return (new Date().getFullYear())
})

hbs.registerHelper('screamIt', (text) => {
  return text? text.toUpperCase() : ' '
})

// set
app.set('view engine', 'hbs')

// middleware

app.use( (req, res, next) => {
  const now = new Date().toString()
  const msg = `[${now}] ${req.method} ${req.url}`

  console.log(msg)
  fs.appendFile('server.log', msg+'\n')

  next()
})

app.use( (req, res, next) => {
  const if_in_maintenance = false

  if (if_in_maintenance) {
    res.render('maintenance.hbs', {
      pageTitle: 'Under Maintenance',
      welcomeMessage: 'Go away.  Come back later.'
    })
  } else {
    next()
  }
})

app.use(express.static(__dirname + '/public'))

// routing
app.get('/', (req, res) => {
  // res.send('<h1>Hello cruel world!</h1>')

  // res.send({name: "pei", likes: ['women', 'girls', 'surfing']})

  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Ha ha ha ha!'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Me Page'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  })
})


app.get('/bad', (req, res) => {
  res.send({error: 'you bad looser'})
})

app.listen( port , () => {
  console.log('server is up')
})
