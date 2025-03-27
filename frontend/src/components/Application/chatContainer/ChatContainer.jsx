import React, { useState, useEffect, useRef, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatSection from "./ChatSection";
import authContext from "../../../context/authContext.js";

import EmojiPicker from "emoji-picker-react";

const ChatContainer = ({ setChatterProfileDialog }) => {
  const { user, selectedContact, socket } = useContext(authContext);

  const [inputMessage, setInputMessage] = useState("");
  const [emojeeDialog, setEmojeeDialog] = useState(false);
  const emojeeRef = useRef();

  const sendMessage = () => {

    const messageLayout = {
      sender: user.email,

      reciever: selectedContact.email,

      message: inputMessage,

      senderName: user.name,

      recieverName: selectedContact.name,

      type: "text",
    };

    socket.emit("sendMessage", messageLayout);

    setInputMessage("");
  };

  useEffect(() => {
    const handleEmojeeCloseonClick = (e) => {
      if (emojeeRef.current && !emojeeRef.current.contains(e.target)) {
        setEmojeeDialog(false);
      }
    };
    document.addEventListener("mousedown", handleEmojeeCloseonClick);

    return () => {
      document.removeEventListener("mousedown", handleEmojeeCloseonClick);
    };
  }, [emojeeRef]);

  return (
    <div className="w-3/4 h-full flex flex-col">
      <ChatHeader setChatterProfileDialog={setChatterProfileDialog} />
      <div className="bg-slate-50 p-[1px] shadow-xl"> </div>
      <ChatSection />
      <div className="absolute bottom-20 mb-2" ref={emojeeRef}>
        {emojeeDialog && (
          <EmojiPicker
            onEmojiClick={(e) => setInputMessage((prev) => prev + e.emoji)}
          />
        )}{" "}
      </div>
      <div className="bg-slate-50 p-[1px] shadow-xl"> </div>
      <ChatFooter
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        setEmojeeDialog={setEmojeeDialog}
      />
    </div>
  );
};

export default ChatContainer;
