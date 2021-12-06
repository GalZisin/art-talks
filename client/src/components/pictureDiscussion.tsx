import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useCallback } from "react";
import { GalleryDataContext } from "../App";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { ICard } from "../types/types";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../redux/actions/cardsAction";
import {
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAIL,
} from "../redux/constants/cardsConstants";
import axios from "axios";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const CONNECTION_PORT = "localhost:3002/";
const baseUrl = "http://localhost:3003";

const PictureDiscussion = () => {

  const { cards } = useSelector((state: RootState) => state.cards);

  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [card, setCard] = useState((): ICard[] => []);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState((): string[] => []);
  // const [cardsGallery, setCardsGallery] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.id);

  const getCardById = (cards: ICard[]) => {
    const card = cards.filter(
      (card: ICard) => card.id!.toString() === params.id!.toString()
    );

    return card;
  };


  useEffect(() => {
    let currentCard;
    console.log("cards", cards)
    if (cards.length === 0) {
      (async () => {
        let gallaryData;
        try {
          gallaryData = await axios.post(baseUrl + `/`);
          gallaryData = JSON.parse(gallaryData.data.data)
          dispatch({
            type: CARDS_SUCCESS,
            payload: gallaryData,
          });
          currentCard = getCardById(gallaryData);
          if (currentCard) {
            setCard(currentCard);

          }
        }
        catch (error) {
          console.log(error);
          gallaryData = [];
        }

      })()
    } else {
      currentCard = getCardById(cards);
      if (currentCard) {
        setCard(currentCard);
      }
    }
  }, [params]);



  useEffect(() => {
    console.log("useEffect2")
    socket = io(CONNECTION_PORT);
  }, [params, CONNECTION_PORT]);

  useEffect(() => {
    console.log("useEffect3")
    socket.on("receive_message", (data: any) => {
      setMessageList([...messageList, data]);
    });
  });



  const connectToRoom = () => {
    setLoggedIn(true);
    setRoom(params.id!);
    socket.emit("join_room", params.id);
  };

  const sendMessage = async () => {
    let messageContent: any = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="picture-discussion-container">
      <div className="picture-discussion-header">
        <h2>{card[0] && card[0]?.title}</h2> <h3>{card[0] && card[0].artistname}</h3>
      </div>
      <div className="picture-discussion-wrapper">
        <div className="picture-discussion-image">
          <img src={`/images/${card[0]?.picture}.jpg`} alt="" />
        </div>

        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Name..."
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <button onClick={connectToRoom}>Enter Chat</button>
          </div>
        ) : (
          <div className="picture-discussion-chat">
            <div className="messages">
              {messageList.map((val: any, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val?.author === userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val?.author}: {val?.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureDiscussion;
