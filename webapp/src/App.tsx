import React from "react";

import { Box } from "@mui/material";
import { green } from "@mui/material/colors";

import { WSContext } from "./contexts/WS";
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  const { messages } = React.useContext(WSContext);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* messages */}
      <Box
        sx={{ backgroundColor: green[100] }}
        flexGrow={1}
        height={"calc(100% - 50px)"}
        overflow="scroll"
      >
        {/* Card */}
        {messages.map(({ message, timestamp }, i) => (
          <Card message={message} timestamp={timestamp} key={i} />
        ))}
      </Box>
      <Form />
    </Box>
  );
}

export default App;
