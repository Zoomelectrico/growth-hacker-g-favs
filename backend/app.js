const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const routes = require('./routes');

mongoose.Promise = global.Promise;

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(async (req, res, next) => {
  if (!req.cookies.token) {
    return next();
  }
  const payload = jwt.decode(req.cookies.token);
  const user = await mongoose.model('User').findById(payload.id);
  if (!user) {
    return next();
  }
  req.user = user;
  res.locals.user = user;
  next();
});

app.use('/', routes);

module.exports = app;
