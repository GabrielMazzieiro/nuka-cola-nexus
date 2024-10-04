import { Server } from 'http';
import express, { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import log from './log/logger';

let app: Express;
let server: Server;

export async function appInitialize() : Promise<Server> {

    app = express();
    app.use(express.json({limit: '5mb'}));
    app.use(json());
    app.use(cors())
    app.use(express.static('public'));

    const PORT = process.env.PORT || 3000;
    const ADDRESS = process.env.ADDRESS || '0.0.0.0';

    server = app.listen(+PORT, ADDRESS,0,() => {
        log.info(`[*] API started successfully.`.blue);
        log.info(`Nuka-Cola Nexus API listening on ${ADDRESS}:${PORT}!`.green);
    });

    return server;
}