import redis from 'redis';

const redisClient = redis.createClient();
redisClient.on('error', error => {
  console.log('Something went wrong ', error);
});

export default redisClient;
