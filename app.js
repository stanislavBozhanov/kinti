var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chokidar = require('chokidar');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var Sequelize = require('sequelize');
var Entry = require('./models/entry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  // lazy: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  publicPath: '/assets/',
  index: 'index.html',
  headers: {'X-Custom-Header': 'yes'},
  mimeTypes: {'text/html': ['phtml']},
  stats: {
    colors: true,
  },
  reporter: null,
  serverSideRender: false,
}));
app.use(webpackHotMiddleware(compiler));

app.use(function (req, res, next) {
  require('./routes/index')(req, res, next);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// POST DATA
app.post('/add-expense', function (req, res) {
  let name = req.body.name;
  let type = 1;  // TODO: create constants file
  let value = req.body.value;
  let date = req.body.date;

  Entry.create({name, type, value, date});
});




const watcher = chokidar.watch('./routes');

watcher.on('ready', function () {
  watcher.on('all', function () {
    console.log('Clearing /server/ module cache from server');
    Object.keys(require.cache).forEach(function (id) {
      if (/[\/\\]routes[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

// Database
const sequelize = new Sequelize('null', 'null', 'null', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  //SQLite only
  storage: 'kinti.db'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
