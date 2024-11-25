import Image from "next/image";
import { useState, useEffect, useRef } from "react";
// import { database, ref, push, onValue, DataSnapshot } from "../utils/firebase";

type Message = {
  text: string;
  timestamp: number;
};

// Mock data
const mockMessages: Message[] = [
  { text: "Hello! How are you?", timestamp: 1637020800000 },
  { text: "I'm fine, thank you! What about you?", timestamp: 1637020860000 },
  { text: "I'm doing great. Working on a React project!", timestamp: 1637020920000 },
  { text: "That sounds exciting! Good luck!", timestamp: 1637020980000 },
  { text: "Hello! How are you?", timestamp: 1637020800000 },
  { text: "I'm fine, thank you! What about you?", timestamp: 1637020860000 },
  { text: "I'm doing great. Working on a React project!", timestamp: 1637020920000 },
  { text: "That sounds exciting! Good luck!", timestamp: 1637020980000 },
  { text: "Hello! How are you?", timestamp: 1637020800000 },
  { text: "I'm fine, thank you! What about you?", timestamp: 1637020860000 },
  { text: "I'm doing great. Working on a React project!", timestamp: 1637020920000 },
  { text: "That sounds exciting! Good luck!", timestamp: 1637020980000 }
];

export default function Chat() {
  //   const [messages, setMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [roomTitle] = useState<string>("จิมมี่จำจะกัด มหาชน");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatRef = useRef<HTMLDivElement>(null); // Reference to the chat container
  
  // ดึงข้อความจาก Firebase
  useEffect(() => {
    // const messagesRef = ref(database, "messages");
    // const messagesRef = ref(database, "messages");
    // const unsubscribe = onValue(messagesRef, (snapshot: DataSnapshot) => {
    //   const data = snapshot.val();
    //   const loadedMessages: Message[] = data
    //     ? Object.values(data)
    //     : [];
    //   setMessages(loadedMessages);
    // });

    // return () => unsubscribe(); // Cleanup subscription
  }, []);

  // ฟังก์ชันส่งข้อความใหม่
  const sendMessage = () => {
    // const messagesRef = ref(database, "messages");
    if (newMessage.trim()) {
      //   push(messagesRef, { text: newMessage, timestamp: Date.now() });

      // สร้างข้อความใหม่
      const aNewMessage = { text: newMessage, timestamp: Date.now() };
      // อัปเดต state โดยการสร้างอาร์เรย์ใหม่
      setMessages([...messages, aNewMessage]);
      setNewMessage("");
    }

  };

  // จับคีย์ Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // move chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      const { scrollHeight, clientHeight } = chatRef.current;
      chatRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
      console.log("Scrolled to bottom");
    }
  }, [messages]);


  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center gap-5 p-5 text-center">
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-5 p-5 m-auto text-center bg-gray-950 bg-opacity-50 shadow-2xl rounded-3xl">
        <h1 className="absolute w-full top-0 left-1/2 -translate-x-1/2 flex justify-center items-center px-4 py-6 bg-gradient-to-b from-black/100 via-black/50 to-transparent rounded-3xl">
          {roomTitle}
        </h1>
        <div
          ref={chatRef}
          className="h-full w-full overflow-auto px-4 py-2 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div key={index} className="w-fit text-base flex flex-row justify-start items-center gap-4 p-2">
              <span className="bg-blue-800 rounded-full w-14 h-14 overflow-hidden">
                <Image src="" alt="1" className="w-full h-full object-contain" />
              </span>
              <div className="flex flex-col justify-center items-start gap-0.5">
                <span className="font-semibold text-sm">User</span>
                <span className="px-4 py-2 bg-gray-500 rounded-3xl rounded-tl-md">{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="h-0.5 w-11/12 bg-white rounded-full opacity-20"></div>
        <div className="w-full flex flex-row gap-4 justify-center items-center">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            placeholder="Enter your massage ..."
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-xl w-full p-2.5 text-center shadow-2xl border border-transparent bg-gray-700 focus:border-gray-500"
          />
          <button onClick={sendMessage} className="rounded-xl px-5 py-2.5 shadow-2xl bg-gray-800 active:bg-gray-400 active:text-black hover:border-gray-600 border-2 border-transparent hover:border-2 active:border-gray-500">
            Send
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
