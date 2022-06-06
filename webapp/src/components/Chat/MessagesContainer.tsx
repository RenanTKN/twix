import { Box } from "@mui/material";
import { green } from "@mui/material/colors";

interface MessagesContainerProps {
  children: JSX.Element;
}

const MessagesContainer = ({ children }: MessagesContainerProps) => (
  <Box
    sx={{ backgroundColor: green[100] }}
    flexGrow={1}
    height={"calc(100% - 50px)"}
    overflow="scroll"
  >
    {children}
  </Box>
);

export default MessagesContainer;
