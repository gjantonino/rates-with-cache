export class Rate {
    constructor(
        public asset_id_base:string,
        public rates:[],
    ) {
        this.asset_id_base = asset_id_base;
        this.rates = rates;
    }
}