import axios from "axios";
import { PATH_API_CRYPTO, GET_GLOBAL_CRYPTO, GLOBAL_CRYPTO } from "../../config/globalVars";

type dataType = {
  base: string | null;
  name: string | null;
  price: number;
  price_usd: number;
  quote: string | null;
  time: number;
  volume: number;
  volume_usd: number;
};

// constants
const dataInitial = {
  array: [],
};

//reducer
export default function globalCryptoReducer(state = dataInitial, action: any) {
  switch (action.type) {
    case GLOBAL_CRYPTO:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

//actions
export const getGlobalCryptoAction =
  () =>
  async (
    dispatch: (arg0: { type: string; payload: dataType[] }) => void,
    getState: any
  ) => {
    try {
      const result = await axios.get(PATH_API_CRYPTO + GET_GLOBAL_CRYPTO);
      dispatch({
        type: GLOBAL_CRYPTO,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
