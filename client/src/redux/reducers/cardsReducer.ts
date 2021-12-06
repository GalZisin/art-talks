import {
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAIL,
  CLEAR_ERRORS,
} from "../constants/cardsConstants";
import { IAction, IState } from "../../types/types";
export const cardsReducer = (state: IState = { cards: [] }, action: IAction) => {
  switch (action.type) {
    case CARDS_REQUEST:
      return {
        loading: true,
        cards: [],
      };
    case CARDS_SUCCESS:
      return {
        loading: false,
        cards: action.payload,
      };
    case CARDS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};
