const express = require('express');
const verifyUser = require('./middlewares/verifyUser');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// Routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const userRoutes = require('./routes/users');

// const ensureLoggedIn = require("connect-ensure-login");
// const session = require("express-session");
const {
  redisClient,
  RedisStore,
  session,
} = require('./connections/redisConnection');

const app = express();

app.use(express.json());

// app.use(flash());
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(
  session({
    // store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      // secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use('/api', authRoutes);

app.use(verifyUser);

// EVENT ROUTES //
app.use('/api/event', eventRoutes);

// USER ROUTES //
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Auth Server Running On Port ${PORT}`);
});
