import { MenuItem } from "@mui/material";
import { GoogleLogout } from "react-google-login";

const clientId = process.env.REACT_APP_CLIENT_ID!;

const OAuthLogout = () => {
  const onSuccess = () => {
    window.location.href = "/";
  };

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onSuccess}
      render={({ disabled, onClick }) => (
        <MenuItem onClick={onClick} disabled={disabled}>
          Logout
        </MenuItem>
      )}
    />
  );
};

export default OAuthLogout;
