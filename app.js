const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
module.exports = app;
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const layout = require('./views/layout');
app.get('/', (req, res) => {
  res.redirect('/wiki');
});
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
