const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Init modules
const app = express();

// Settings
app.set('port', 3000);
app.set('views', path.resolve(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use(require('./routes/index.js'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Init Server
const server = app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))
