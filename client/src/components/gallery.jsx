import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { GalleryDataContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../redux/actions/cardsAction";
const Gallery = () => {
  // const gallaryCards = useContext(GalleryDataContext);
  const { cards } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [allCards, setAllCards] = useState([]);
  const [cardsGallery, setCardsGallery] = useState([]);

  useEffect(() => {
    // getGallery();
    dispatch(getCards());
    console.log("cards", cards);
    if (cards) {
      console.log("cards", cards);
      setAllCards(cards);
      setCardsGallery(cards);
    }

    return () => {};
  }, [dispatch]);

  // const getGallery = useCallback(() => {
  //   setAllCards(galleryCards);
  //   setCards(galleryCards);
  // }, [cards]);

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredCards = allCards.filter(
      (card) =>
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
        {cardsGallery.map((card, index) => (
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
