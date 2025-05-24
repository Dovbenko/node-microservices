/**
 * @module redisConnection
 * @description Redis connection handler for the catalog service.
 * Manages the connection to Redis for caching and pub/sub operations.
 */

const redis = require('@redis/client');

/**
 * Creates and configures a Redis client connection
 * @function connectToRedis
 * @param {Object} options - Redis connection options
 * @param {string} options.url - Redis connection URL (e.g., redis://localhost:6379)
 * @param {string} [options.password] - Redis password if authentication is required
 * @param {number} [options.retryStrategy] - Retry strategy for connection attempts
 * @returns {Object} Redis client instance
 * @throws {Error} If connection fails, process will exit with code 1
 */
const connectToRedis = (options) => {
  const client = redis.createClient(options);

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
    process.exit(1);
  });

  return client;
};

module.exports = connectToRedis;
