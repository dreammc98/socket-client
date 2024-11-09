import React, { ChangeEvent, useEffect, useState, FormEventHandler } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserFormType } from "./Main";
import EmojiPicker from "emoji-picker-react";
import styles from "../styles/Chat.module.css";
import icon from "../img/emoji.svg";
import { Messages } from "./Messages";

export type messageServerType = { user: { name: string }; message: string };

const socket = io("http://localhost:5000/");
const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<UserFormType>({ name: "", room: "" });

  const [messageServer, setMessageServer] = useState<messageServerType[]>([]);

  const [message, setMessage] = useState<string>("");
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search)) as UserFormType;
    setParams(searchParams);

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessageServer((_state) => [..._state, data]);
    });
  }, []);
  useEffect(() => {
    socket.on("number of users", (user) => {
      setNumberOfUsers(user.length);
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leave Room", { params });
      socket.close();
      debugger;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [params]);

  const leaveRoomHandler = () => {
    socket.emit("leave Room", { params });
    navigate("/");
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onEmojiClick = ({ emoji }: any) => {
    setMessage(`${message} ${emoji}`);

    setOpenPicker(!isOpenPicker);
  };
  const submitHandle: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{numberOfUsers} users in this room</div>
        <button onClick={leaveRoomHandler} className={styles.leave}>
          Leave the room
        </button>
      </div>
      <div className={styles.messages}>
        <Messages messages={messageServer} name={params.name} />
      </div>
      <form className={styles.form} onSubmit={submitHandle}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Just do it"
            value={message}
            onChange={inputHandler}
            autoComplete="off"
            required={true}
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="icon" onClick={() => setOpenPicker(!isOpenPicker)} />
          {isOpenPicker && (
            <div className={styles.emojis}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <button type="submit">Send a message</button>
        </div>
      </form>
    </div>
  );
};
// 1:25
export default Chat;
