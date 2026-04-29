import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
});

redisClient.on('connect', () => {
    console.log('Redis Connected...');
});

// Connect immediately — the promise is awaited at startup in index.js
await redisClient.connect();

export default redisClient;
