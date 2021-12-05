import {
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAIL,
  CLEAR_ERRORS,
} from "../constants/cardsConstants";

export const cardsReducer = (state = { cards: [] }, action) => {
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
