import axios from "axios";
import { PATH_API_CRYPTO, GET_MARKET_CRYPTO_API, GET_MARKET } from "../../config/globalVars";

// type dataType = {
//   base: string | null;
//   name: string | null;
//   price: number;
//   price_usd: number;
//   quote: string | null;
//   time: number;
//   volume: number;
//   volume_usd: number;
// };

// constants
const dataInitial = {
  array: [],
};

//reducer
export default function cryptoReducer(state = dataInitial, action: any) {
  switch (action.type) {
    case GET_MARKET:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

//actions
export const getMarketCryptoAction =
  (id: number) =>
  async ( dispatch: any ) => {
    try {
      const result = await axios.post(PATH_API_CRYPTO + GET_MARKET_CRYPTO_API, {id: id});
      dispatch({
        type: GET_MARKET,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
