import { services } from '../../../services';

export const getAll = {
    route: '/rates/:baseAsset',
    hanlder: async (req, res:any) => {
        try {
            console.log('Getting data...')
            const cacheKey:string = req.originalUrl;
            const baseAsset:string = req.params.baseAsset;
            const data = await services.coinApi.getAllExchangeRates(baseAsset);
            req.app.locals.cache.set(cacheKey, data);
            res.status(200).send(data);
        } catch (e) {
            console.error(e);
            res.status(500).send('Error');
        }
    }
}