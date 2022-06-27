import express from 'express';
import { rates } from './rates';
const router = express.Router();

//healthcheck
router.get('/healthcheck', (req, res) => res.send('OK'));

//v1/rates
router.get(rates.getAll.route, rates.getAll.hanlder);

export default router