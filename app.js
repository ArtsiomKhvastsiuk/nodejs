import express from 'express';
import cookieParser from 'cookie-parser';
import queryString from 'querystring';
import bodyParser from 'body-parser';
import url from 'url';
import router from './routes/router';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.query = queryString.parse(url.parse(req.url).query);
    next();
});

app.use('/api', router);

app.use((req, res, next) => {
   res.status(404).end('Not found!');
});

export default app;
