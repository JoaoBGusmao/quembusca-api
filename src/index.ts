import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { startup as databaseStartup } from './services/database';
import routes from './routes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

databaseStartup();

const app = express();

app.use(bodyParser.json());

app.use('/v1/', routes);

app.listen(5001);
