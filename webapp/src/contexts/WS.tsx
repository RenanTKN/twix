import { createContext, ReactNode, useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io();

// const WS_SERVER =
//   process.env.NODE_ENV === "production"
//     ? getWSServer()
//     : process.env.REACT_APP_WS_SERVER ?? "ws://192.168.4.1/ws";

interface WSProviderProps {
  children: ReactNode;
}

export interface Message {
  message: string;
  timestamp: number;
}

interface WSData {
  messages: Message[];
  sendMessage: (message: Message) => void;
}

export const WSContext = createContext({} as WSData);

export const WSProvider = ({ children }: WSProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (msg: Message) => {
      setMessages((m) => [...m, msg]);
    });
  }, []);

  const sendMessage = (msg: Message) => {
    socket.emit("message", msg);
  };

  const WSProviderValue = {
    messages,
    sendMessage,
  };

  return (
    <WSContext.Provider value={WSProviderValue}>{children}</WSContext.Provider>
  );
};
