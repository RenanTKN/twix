import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

import { ToastContext } from "./ToastContext";

const socket = io();

// const WS_SERVER =
//   process.env.NODE_ENV === "production"
//     ? getWSServer()
//     : process.env.REACT_APP_WS_SERVER ?? "ws://192.168.4.1/ws";

interface WSProviderProps {
  children: ReactNode;
}

export interface Message {
  name: string;
  imageUrl: string;
  message: string;
  timestamp: number;
}

interface WSData {
  messages: Message[];
  sendLoginNotification: (name: string) => void;
  sendMessage: (message: Message) => void;
}

export const WSContext = createContext({} as WSData);

export const WSProvider = ({ children }: WSProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toastInfo } = useContext(ToastContext);

  useEffect(() => {
    socket.on("message", (msg: Message) => {
      setMessages((m) => [...m, msg]);
    });

    socket.on("user login", (name: string) => {
      toastInfo(`${name} joined the chat`);
    });
  }, [toastInfo]);

  const sendLoginNotification = (name: string) => {
    socket.emit("user login", name);
  };

  const sendMessage = (msg: Message) => {
    socket.emit("message", msg);
  };

  const WSProviderValue = {
    messages,
    sendLoginNotification,
    sendMessage,
  };

  return (
    <WSContext.Provider value={WSProviderValue}>{children}</WSContext.Provider>
  );
};
