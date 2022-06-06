import { Box, Card, CardContent, Grid } from "@mui/material";

import OAuth from "../OAuth/Login";

const Login = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
      <CardContent>
        <Grid container direction="column" spacing={5} alignItems="center">
          <Grid item>
            <img src="twix-logo.png" alt="logo" />
          </Grid>
          <Grid item>
            <OAuth />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

export default Login;
