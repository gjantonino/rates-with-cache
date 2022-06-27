import express from 'express';
import v1Routes from './api/v1';
import { middleware } from './middleware';
import { Cache } from './models/Cache';

const app = express();
const port = 8000;

app.use('/v1/rates', middleware.cacheCheck);
app.use('/v1', v1Routes);

app.locals.cache = Object.prototype.hasOwnProperty.call(app.locals, 'cache') ? app.locals.cache : {};
app.locals.cache = new Cache('ratesCache', 60000);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

export const server = app;