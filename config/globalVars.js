const API = 'https://api.coinlore.net/api/';

const PATH_API_CRYPTO = 'https://criptolist-3v4fgitbf-rodacapera.vercel.app/'; //production
// const PATH_API_CRYPTO = 'http://localhost:3000/api/'
const GET_CRYPTO_API = 'crypto';
const GET_CRYPTO_DETAIL_API = 'crypto_detail';
const GET_MARKET_CRYPTO_API = 'market';
const GET_GLOBAL_CRYPTO = 'global_crypto';

const PATH_ALL_CRYPTO = 'tickers/?start=100&limit=100';
const PATH_DETAIL_CRYPTO = 'ticker/?id=';
const PATH_MARKET_CRYPTO = 'coin/markets/?id=';
const PATH_GLOBAL_CRYPTO = 'global'

const GET_CRYPTO = 'GET_CRYPTO';
const GET_DETAIL =  'GET_DETAIL'
const GET_MARKET = 'GET_MARKET';
const GLOBAL_CRYPTO = 'GLOBAL_CRYPTO'; 

export {
    API,
    PATH_API_CRYPTO,
    GET_CRYPTO_API,
    GET_CRYPTO_DETAIL_API,
    GET_MARKET_CRYPTO_API,
    PATH_ALL_CRYPTO,
    PATH_DETAIL_CRYPTO,
    PATH_MARKET_CRYPTO,
    PATH_GLOBAL_CRYPTO,
    GET_CRYPTO,
    GET_DETAIL,
    GET_MARKET,
    GLOBAL_CRYPTO,
    GET_GLOBAL_CRYPTO
}