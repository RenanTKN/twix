import React from "react";

import { Box } from "@mui/material";

import { WSContext } from "../../contexts/WS";
import AppBar from "../AppBar";
import Form from "../Form";
import Card from "./Card";
import MessagesContainer from "./MessagesContainer";

const Chat = () => {
  const { messages } = React.useContext(WSContext);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <AppBar />
      <MessagesContainer>
        <>
          {messages.map(({ imageUrl, message, name, timestamp }, i) => (
            <Card
              imageUrl={imageUrl}
              message={message}
              timestamp={timestamp}
              name={name}
              key={i}
            />
          ))}
        </>
      </MessagesContainer>
      <Form />
    </Box>
  );
};

export default Chat;
