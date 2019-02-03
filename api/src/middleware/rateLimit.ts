import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

import * as httpMessages from '../utils/httpMessages';

const redisClient = createClient({
    host: 'localhost',
    port: 6379,
    enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 100, // upto 100 consecutive requests per 15 mins before blocked
    duration: 15 * 60 * 1000, // 15 minutes
    blockDuration: 0,
});

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.connection.remoteAddress;
    if (!ip) {
        return res.status(500).json(httpMessages.code500());
    }

    return rateLimiter
        .consume(String(ip))
        .then(() => {
            return next();
        })
        .catch(() => {
            return res.status(429).json({
                message: {
                    status: 429,
                    error: 'To many requests',
                    message: 'To many requests, please try again later',
                },
            });
        });
};
