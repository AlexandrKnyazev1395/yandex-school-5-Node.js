const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

// webpack-dev-server
if (isDeveloping) {
  // eslint-disable-next-line
  console.log('server with webpack-dev-server');
  // eslint-disable-next-line
  const webpack = require('webpack');
  // eslint-disable-next-line
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line
  const webpackConfig = require('./webpack.config.dev.js');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  app.use(middleware);
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

const index = require('./routes/index');
const sources = require('./routes/sources');
const commits = require('./routes/commits');
const file = require('./routes/file');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/sources', sources);
app.use('/commits', commits);
app.use('/file', file);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
