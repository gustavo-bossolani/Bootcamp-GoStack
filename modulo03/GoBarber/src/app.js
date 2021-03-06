import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        );
        this.server.use(express.static(path.resolve(__dirname, '/public')));
    }

    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    exceptionHandler() {
        // definindo um middleware de tratamento de excecoes
        this.server.use(async (err, req, resp, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();
                return resp.status(500).json(errors);
            }
            return resp
                .status(500)
                .json({ error: 'Erro interno do servidor.' });
        });
    }
}

export default new App().server;
