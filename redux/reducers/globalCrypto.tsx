import axios from "axios";
import { PATH_API_CRYPTO, GET_GLOBAL_CRYPTO, GLOBAL_CRYPTO } from "../../config/globalVars";

// interfaces
interface dataInitial {
  array: [],
}

interface argsDispatch {
  type: string;
  payload: [];
}

//reducer
export default function globalCryptoReducer(state: dataInitial = {array: []}, action: argsDispatch) {
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
  async ( dispatch: any ) => {
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
