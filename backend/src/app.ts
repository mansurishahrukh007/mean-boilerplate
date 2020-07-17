import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import privateRoutes from './routes/private';
import publicRoutes from './routes/public';
import { validateToken } from "./utilities/token";
import './config/database';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
    '/api',
    validateToken,
    privateRoutes
); // allow access to private APIs

app.use('/public', publicRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
});
