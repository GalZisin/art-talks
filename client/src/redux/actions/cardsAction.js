import axios from "axios";
import {
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAIL,
} from "../constants/cardsConstants";
const baseUrl = "http://localhost:3003";

export const getCards = () => async (dispatch) => {
  try {
    dispatch({ type: CARDS_REQUEST });

    const gallaryCards = await axios.post(baseUrl + `/`);
    console.log(JSON.parse(gallaryCards.data.data));
    dispatch({
      type: CARDS_SUCCESS,
      payload: JSON.parse(gallaryCards.data.data),
    });
  } catch (error) {
    dispatch({
      type: CARDS_FAIL,
      payload: error.response.data.message,
    });
  }
};
