import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { GalleryDataContext } from "../App";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3002/";

const PictureDiscussion = () => {
  const allCards = useContext(GalleryDataContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [card, setCard] = useState([]);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const currentCard = getCardById();
    if (currentCard) {
      setCard(currentCard);
    }
  }, [params]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [params, CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const getCardById = () => {
    const card = allCards.filter(
      (card) => card.id.toString() === params.id.toString()
    );
    return card;
  };

  const connectToRoom = () => {
    setLoggedIn(true);
    setRoom(params.id);
    socket.emit("join_room", params.id);
  };

  const sendMessage = async () => {
    let messageContent = {
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
        <h2>{card[0]?.title}</h2> <h3>{card[0]?.artistname}</h3>
      </div>
      <div className="picture-discussion-wrapper">
        <div className="picture-discussion-image">
          <img src="/images/sunflowers.jpg" alt="" />
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
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author === userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
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
