import axios from "axios";
import {
  PATH_API_CRYPTO,
  GET_MARKET_CRYPTO_API,
  GET_MARKET,
} from "../../config/globalVars";

// interfaces
interface dataInitial {
  array: [],
}

interface argsDispatch {
  type: string;
  payload: [];
}

//reducer
export default function marketReducer(
  state: dataInitial = {array: []},
  action: argsDispatch
) {
  switch (action.type) {
    case GET_MARKET:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

//actions
export const getMarketCryptoAction = (id: number) => async (dispatch: any) => {
  try {
    const result = await axios.post(PATH_API_CRYPTO + GET_MARKET_CRYPTO_API, {
      id: id,
    });
    dispatch({
      type: GET_MARKET,
      payload: result.data,
    });
  } catch (error) {
    console.error(error);
  }
};
