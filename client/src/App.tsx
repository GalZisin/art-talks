import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/gallery";
import PictureDiscussion from "./components/pictureDiscussion";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "./redux/actions/cardsAction";
import { RootState } from './redux/store'
import axios from "axios";
// import {
//   CARDS_REQUEST,
//   CARDS_SUCCESS,
//   CARDS_FAIL,
// } from "./redux/constants/cardsConstants";
const baseUrl = "http://localhost:3003";

// const baseUrl = "http://localhost:3003";
export const GalleryDataContext = createContext([]);

function App() {
  // const [gallaryCards, setGallaryCards] = useState([]);
  // const { cards } = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();

  // const getData = async () => {
  //   try {
  //     const gallaryCards = await axios.post(baseUrl + `/`);
  //     console.log("xxxx", JSON.parse(gallaryCards.data.data));
  //     // setGallaryCards(JSON.parse(gallaryCards.data.data));
  //     setTimeout(() => {
  //       return JSON.parse(gallaryCards.data.data);
  //     }, 2000);
  //     // setGallaryCards(JSON.parse(gallaryCards.data.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [allCards, setAllCards] = useState([]);
  useEffect(() => {
    // (async () => {
    //   let gallaryData;
    //   gallaryData = await axios.post(baseUrl + `/`);
    //   gallaryData = JSON.parse(gallaryData.data.data)
    //   console.log("allCards", gallaryData)
    //   dispatch({
    //     type: CARDS_SUCCESS,
    //     payload: JSON.parse(gallaryData),
    //   });
    //   setAllCards(gallaryData);
    //   // setCardsGallery(gallaryData);
    // })()

  }, []);

  return (
    <div className="App">
      {/* <GalleryDataContext.Provider value={allCards}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route
            path="/picture-discussion/:id"
            element={<PictureDiscussion />}
          />
        </Routes>
      </Router>
      {/* </GalleryDataContext.Provider> */}
    </div>
  );
}

export default App;
