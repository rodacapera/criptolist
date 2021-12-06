import axios from "axios";
import {
  PATH_API_CRYPTO,
  GET_CRYPTO_API,
  GET_CRYPTO_DETAIL_API,
  GET_CRYPTO,
  GET_DETAIL,
} from "../../config/globalVars";
import { AnyAction } from "redux";

type dataType = {
  name: string | null;
  id: string | null;
  symbol: string | null;
  nameid: string | null;
  rank: number;
  price_usd: string | null;
  percent_change_24h: string | null;
  percent_change_1h: string | null;
  percent_change_7d: string | null;
  price_btc: string | null;
  market_cap_usd: string | null;
  volume24: number;
  volume24a: number;
  csupply: string | null;
  tsupply: string | null;
  msupply: string | null;
  key: number;
};

export interface dataInitial {
  array: any,
}

export interface argsDispatch {
  type: string;
  payload: dataType;
}

//reducer
export default function cryptoReducer(
  state: dataInitial = { array: [] },
  action: AnyAction
) {
  switch (action.type) {
    case GET_CRYPTO:
      action.payload.map((element: any, key: number) => {
        element.key = key;
      });
      return { ...state, array: action.payload };
    case GET_DETAIL:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

//actions
export const getCryptoAction =
  () =>
  async ( dispatch: any ) => {
    try {
      const result = await axios.get(PATH_API_CRYPTO + GET_CRYPTO_API);
      dispatch({
        type: GET_CRYPTO,
        payload: result.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getDetailCryptoAction =
  ( id: number ) =>
  async ( dispatch: any ) => {
    try {
      // console.log('url de criptoreducer', PATH_API_CRYPTO + GET_CRYPTO_DETAIL_API);
      // console.log('id de cryptroreducer', id);
      const result = await axios.post(PATH_API_CRYPTO + GET_CRYPTO_DETAIL_API, {
        id: id,
      });
      // console.log('result de crypto reducer', result);
      
      dispatch({
        type: GET_DETAIL,
        payload: result.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
