import axios, { AxiosRequestConfig } from 'axios';
import { Rate } from '../../models/Rate';
import { coinApi } from '../../config';

export async function getAllExchangeRates(baseAsset = 'BTC'): Promise<object> {
    try {
        const options: AxiosRequestConfig = {
            method: 'get',
            baseURL: coinApi.API_URL,
            url: coinApi.endpoints.allCurrentRates + baseAsset,
            headers: {
                "X-CoinAPI-Key": coinApi['API_KEY']
            }
        }
        const response = await axios(options);
        return new Rate(response.data.asset_id_base, response.data.rates);
    } catch (e:any) {
        console.error(e);
        throw new Error (`Unable to get rates: ${e.message}`)
    }
}