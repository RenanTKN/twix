import { Avatar, Box, Grid, Paper, styled, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { format } from "date-fns";

import { Message } from "../../contexts/WS";

const StyledCard = styled(Paper)({
  margin: 8,
  padding: 8,
  paddingBottom: 0,
  display: "inline-block",
  minWidth: 300,

  ".name": {
    fontSize: 12,
    fontWeight: 800,
    color: blue[500],
  },

  ".timestamp": {
    fontSize: 10,
    textAlign: "right",
  },
});

const Card = ({ imageUrl, message, name, timestamp }: Message) => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <StyledCard>
        <Typography gutterBottom className="name">
          {name}
        </Typography>
        <Grid container alignItems="center" spacing={1} wrap="nowrap">
          <Grid item>
            <Avatar alt={name} src={imageUrl} />
          </Grid>
          <Grid item>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" className="timestamp">
          {format(new Date(timestamp), "kk:mm")}
        </Typography>
      </StyledCard>
    </Box>
  );
};

export default Card;
