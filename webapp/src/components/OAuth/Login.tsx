import React from "react";
import { useNavigate } from "react-router-dom";

import { Google as GoogleIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import GoogleLogin from "react-google-login";

import { AuthContext } from "../../contexts/AuthContext";
import { WSContext } from "../../contexts/WS";

const clientId = process.env.REACT_APP_CLIENT_ID!;

const OAuthLogin = () => {
  const navigate = useNavigate();
  const { setProfile } = React.useContext(AuthContext);
  const { sendLoginNotification } = React.useContext(WSContext);

  const onSuccess = (res: any) => {
    const { profileObj } = res;
    setProfile(profileObj);
    navigate("/chat");
    sendLoginNotification(profileObj.name);
  };

  const onFailure = (res: any) => {
    console.log("Failure");
    console.log(res);
  };

  console.log(`clientId: ${clientId}`);

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn={true}
      render={({ disabled, onClick }) => (
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={onClick}
          disabled={disabled}
        >
          Login
        </Button>
      )}
    />
  );
};

export default OAuthLogin;
