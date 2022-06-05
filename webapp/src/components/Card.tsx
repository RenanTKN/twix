import { Box, Paper, styled, Typography } from "@mui/material";
import { format } from "date-fns";

import { Message } from "../contexts/WS";

const StyledCard = styled(Paper)({
  margin: 8,
  padding: 8,
  paddingBottom: 0,
  display: "inline-block",
  minWidth: 300,

  ".timestamp": {
    fontSize: 10,
    textAlign: "right",
  },
});

const Card = ({ message, timestamp }: Message) => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <StyledCard>
        <Typography>{message}</Typography>
        <Typography color="text.secondary" className="timestamp">
          {format(new Date(timestamp), "kk:mm")}
        </Typography>
      </StyledCard>
    </Box>
  );
};

export default Card;
