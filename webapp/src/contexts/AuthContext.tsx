import { gapi } from "gapi-script";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID!;

interface AuthProviderProps {
  children: ReactNode;
}

export interface Profile {
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
}

interface AuthData {
  profile?: Profile;
  isAuthenticated: () => boolean;
  setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
}

export const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const isAuthenticated = () => !!profile?.email;

  const AuthProviderValue = {
    profile,
    isAuthenticated,
    setProfile,
  };

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
