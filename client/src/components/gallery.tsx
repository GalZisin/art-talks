import { useEffect, useState, useContext, useCallback, EventHandler, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { GalleryDataContext } from "../App";
import { useDispatch } from "react-redux";

import { ICard } from "../types/types";

import axios from "axios";

import {
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAIL,
} from "../redux/constants/cardsConstants";
const baseUrl = "http://localhost:3003";

const Gallery = (data: any) => {

  const dispatch = useDispatch();
  const gallaryCards = useContext(GalleryDataContext);


  const [allCards, setAllCards] = useState([]);
  const [cardsGallery, setCardsGallery] = useState([]);

  useEffect(() => {

    (async () => {
      let gallaryData;
      try {
        gallaryData = await axios.post(baseUrl + `/`);
        gallaryData = JSON.parse(gallaryData.data.data)
        dispatch({
          type: CARDS_SUCCESS,
          payload: gallaryData,
        });
        setAllCards(gallaryData);
        setCardsGallery(gallaryData);
      }
      catch (error) {
        console.log(error);
        gallaryData = [];
      }

    })()
  }, [data]);



  const filterCards = (event: any) => {
    const value = event?.target?.value?.toLowerCase();
    const filteredCards = allCards.filter(
      (card: ICard) =>
        `${card.title}`.toLowerCase().includes(value) ||
        `${card.artistname}`.toLowerCase().includes(value)
    );
    setCardsGallery(filteredCards);
  };
  return (
    <>
      <h1>Art Talks</h1>
      <div className="searchBox">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          type="text"
          onInput={filterCards}
          placeholder="What are you looking for?"
        />
      </div>
      <div className="cards-container">
        {cardsGallery &&
          cardsGallery.map((card: ICard, index: number) => (
            <Link
              key={index}
              className="card-link"
              to={{
                pathname: `/picture-discussion/${index + 1}`,
              }}
            >
              <Card key={index} galleryData={card} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Gallery;
