export function cacheCheck (req,res,next) {
    if (req.method !== 'GET') {
        return next();
    }
    try {
        const cacheKey:string = req.originalUrl;
        const data = req.app.locals.cache.get(cacheKey);
        if(data) {
            console.log('From cache');
            return res.status(304).send(data);
        }
        console.log('No cache');
        return next();
    } catch(e) {
        console.error(e);
        return next();
    }
}