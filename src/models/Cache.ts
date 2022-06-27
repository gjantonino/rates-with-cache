export class Cache {
    public cacheName:string;
    public cacheTTL:number
    public cacheData = new Map();
    public intervalId;
    constructor(cacheName:string, cacheTTL:number )
    {
        this.cacheName = cacheName;
        this.cacheTTL = cacheTTL;
        this.intervalId = setInterval(()=> {
            console.log('Cache expired...');
            this.cacheData.clear();
        }, this.cacheTTL)
    }
    public set(cacheKey:string, data:object):void {
        this.cacheData.set(cacheKey, data);
    }
    public get(cacheKey:string) {
        if (this.cacheData.has(cacheKey)) {
            return this.cacheData.get(cacheKey);
        }
        return null;
    }
    public clearRefresh() {
        clearInterval(this.intervalId);
    }
}