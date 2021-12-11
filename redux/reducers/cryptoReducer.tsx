import axios from "axios";
import {
  PATH_API_CRYPTO,
  GET_CRYPTO_API,
  GET_CRYPTO_DETAIL_API,
  GET_CRYPTO,
  GET_DETAIL,
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
export default function cryptoReducer(
  state: dataInitial = {array: []},
  action: argsDispatch
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
      const result = await axios.post(PATH_API_CRYPTO + GET_CRYPTO_DETAIL_API, {
        id: id,
      });
      dispatch({
        type: GET_DETAIL,
        payload: result.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
