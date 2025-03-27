import { RiEmojiStickerFill } from "react-icons/ri";
import { FaPaperclip } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";

const ChatFooter = ({
  setInputMessage,
  inputMessage,
  sendMessage,
  setEmojeeDialog,
}) => {

  const enterIsSend = (e) => {
    if (e.which == 13) {
      sendMessage();
  }
  }

  return (
    <div className="w-full h-20 bg-slate-200 flex flex-row p-4 justify-between items-center">
      <div className="flex justify-center items-center p-4">
        <div
          className="p-2 cursor-pointer hover:bg-slate-50 rounded-full"
          onClick={() => setEmojeeDialog((prev) => !prev)}
        >
          <RiEmojiStickerFill size="30" />
        </div>
        <div
          className="p-2 cursor-pointer hidden hover:bg-slate-50 rounded-full ml-2"
        >
          <FaPaperclip size="30" />
        </div>
        <input
          type="file"
          name="documentMessage"
          id="documentMessage"
          className="hidden"
        />
      </div>
      <div className="flex flex-1">
        <input
          type="text"
          className="flex-1 focus:outline-none h-10 rounded-lg text-sm p-2"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value) }
          onKeyDown={enterIsSend}
        />
      </div>
      <div
        className="px-4 py-2 cursor-pointer hover:shadow-sm rounded-full flex items-center justify-center ml-2"
        onClick={sendMessage}
      >
        <RiSendPlane2Fill size="30" />
      </div>
    </div>
  );
};

export default ChatFooter;
