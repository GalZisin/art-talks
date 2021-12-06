import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cardsReducer } from "./reducers/cardsReducer";

const reducer = combineReducers({
  cards: cardsReducer,
});

let initialState = {};
const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export type RootState = ReturnType<typeof store.getState>

export default store;
