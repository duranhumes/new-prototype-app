import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as hpp from 'hpp';

import controllers from './controllers';
import { gate, errorHandler, contentType } from './middleware';

morgan.token('id', req => req.ip);
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

/**
 * App instance
 */
const app = express();

/**
 * Middlewares
 */
if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
}
app.disable('x-powered-by');
app.use(helmet());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);
app.use(
    new rateLimit({
        windowMs: 15 * 60 * 1000, // 15 mins
        max: 100, // upto 100 requests every 15 mins
        message: {
            status: 429,
            error: 'To many requests',
            message: 'To many requests, please try again later',
        },
    })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(hpp());
app.use(
    morgan(loggerFormat, {
        stream: process.stderr,
    })
);

/**
 * Routes
 */
const router = express.Router();

app.use(gate);
app.use(contentType);
app.use('/v1', router);

router.get('/_healthz', (_, res) => res.sendStatus(200));
router.use('/listings', controllers.ListingsController);
router.use('/categories', controllers.CategoriesController);
router.use('/news', controllers.NewsController);

app.use(errorHandler);

export default app;
