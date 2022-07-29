const cors = require('cors');
const express = require('express');
const PORT = 4000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDb = require('./src/configs/database/connectDb');
const users = require('./src/routes/users');
const auth = require('./src/routes/auth');
const utils = require('./src/routes/utils');
const countries = require('./src/routes/countries');
const pages = require('./src/routes/pages');
const categories = require('./src/routes/categories');
const product = require('./src/routes/product');
const homepage = require('./src/routes/homepage');
const cart = require('./src/routes/cart');
const order = require('./src/routes/order');

const packages = require('./src/routes/package');
const files = require('./src/routes/files');
const siteSettings = require('./src/routes/siteSettings');
const { ValidationError } = require('express-validation');
const validationErrors = require('./src/utils/helper');

// start app
const app = express();

// load .env when env = development.
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: process.cwd() + '/.env.development' });
  // load logging middleware
  app.use(morgan('dev'));
}else{
	
	require('dotenv').config()
}

// connect to db
connectDb();






// cors
app.use(
  cors({
    origin: '*',
  })
);

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
app.use('/users', users);
app.use('/auth', auth);
app.use('/utils', utils);
app.use('/countries', countries);
app.use('/pages', pages);
app.use('/categories', categories);
app.use('/products', product);
app.use('/homepage', homepage);
app.use('/cart', cart);
app.use('/order', order);
app.use('/packages', packages);
app.use('/files', files)
app.use(validationErrors)
app.use('/site-settings', siteSettings);
// start server
app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
