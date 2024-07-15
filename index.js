const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const keys = require('./config/keys');
const { resolve } = require('path');
const cors = require('cors');
require('./models/User');
require('./models/Survey');
require('./services/passport');
require('./services/stripe');
require('./services/Mailer');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cors({
    origin: keys.CLIENT_DOMAIN, // replace with your client's origin
    credentials: true,
  })
);

app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    store: MongoStore.create({ mongoUrl: keys.mongoURI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/api/payment/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(bodyParser.json());

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api', paymentRoutes);

const surveyRoutes = require('./routes/surveyRoutes');
app.use('/api', surveyRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
