import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

//get reducers
import cryptoReducer from "./reducers/cryptoReducer";
import marketReducer from "./reducers/marketReducer";
import globalCrypto from "./reducers/globalCrypto";


//set reducers into combineReducers
const rootReducer = combineReducers({
  crypto: cryptoReducer, 
  market: marketReducer,
  global: globalCrypto,
});

export interface stateInitial {
  crypto: any,
  market: any,
  global: any,
}

//validate if hydrate
const reducer = (state: stateInitial, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

//create store
const myStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

export default createWrapper(myStore);
