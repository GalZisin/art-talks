import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/gallery";
import PictureDiscussion from "./components/pictureDiscussion";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "./redux/actions/cardsAction";
// const baseUrl = "http://localhost:3003";
export const GalleryDataContext = createContext();

function App() {
  const [gallaryCards, setGallaryCards] = useState([]);
  const { cards } = useSelector((state) => state.cards);
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

  useEffect(() => {
    let active = true;
    dispatch(getCards());
    if (cards) {
      setGallaryCards(cards);
    }
    // const cards = getData();
    // console.log(cards);
    // if (cards) {
    //   setGallaryCards(cards);
    // }
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="App">
      {/* <GalleryDataContext.Provider value={cards}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} exact />
          <Route
            path="/picture-discussion/:id"
            element={<PictureDiscussion />}
            exact
          />
        </Routes>
      </Router>
      {/* </GalleryDataContext.Provider> */}
    </div>
  );
}

export default App;
