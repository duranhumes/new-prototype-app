import { Request, Response, NextFunction } from 'express';

import logging from '../utils/logging';
import * as httpMessages from '../utils/httpMessages';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    if (err) {
        logging.error({
            ip: req.ip,
            message: req.statusMessage,
            code: req.statusCode,
            error: err,
        });

        return res.status(500).json(httpMessages.code500());
    }

    return res.status(404).json(httpMessages.code404());
};
