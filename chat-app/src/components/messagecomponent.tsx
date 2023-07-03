import jwt from "jwt-decode";

interface PropTypes {
  sender_id: string;
  sendername: string;
  message: string;
}

const MessageComponent = ({ sender_id, sendername, message }: PropTypes) => {
  const token = localStorage.getItem("userToken");
  const decodedToken: any = jwt(token!);
  let isUser = false;
  if (decodedToken.user_id === sender_id) {
    isUser = true;
  }

  return (
    <div className="relative max-h-[150px] w-[95%] m-[2.5%] flex flex-col justify-start">
      <div
        className={`relative h-full max-w-[75%] mx-[5%] my-[2.5%] flex flex-col ${
          isUser === false ? "self-start" : "self-end"
        }`}
      >
        <p
          className={`${
            isUser === false ? "self-start" : "self-end"
          } font-bold text-[14px] text-black/50`}
        >
          {sendername}
        </p>
        <textarea
          name=""
          id=""
          value={message}
          className="h-[65px] max-w-[150px] bg-[#3A1078]/75 text-white/75 text-[14px] p-[5px] rounded-[5px]"
          readOnly
        />
      </div>
    </div>
  );
};

export default MessageComponent;
