import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserContext {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

interface Auth {
  isAuth: boolean;
  username: string | null;
}

const UserContext = createContext<UserContext>({} as UserContext);

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth>({
    isAuth: false,
    username: null,
  })

  return (
    <UserContext.Provider value={{ auth, setAuth}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };