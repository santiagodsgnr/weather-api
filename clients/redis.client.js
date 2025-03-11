import { createClient } from "redis";

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
});

redisClient.on('error', (err) => {
    console.error("Redis error:", err);
});

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.log("🟢 Redis connected successfully");
        } catch (error) {
            console.error("🔴 Failed to connect to Redis:", error);
            process.exit(1);
        }
    }
};

export { redisClient, connectRedis }