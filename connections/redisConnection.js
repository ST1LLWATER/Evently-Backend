const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');
require('dotenv').config();

// const RedisStore = connectRedis(session);

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
// });

// redisClient.on('error', function (err) {
//   console.log('Error In Redis:', err);
// });

// redisClient.on('connect', function () {
//   console.log('Connected To Redis');
// });

module.exports = {
  // redisClient,
  // RedisStore,
  session,
};
