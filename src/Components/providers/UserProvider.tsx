import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  uid: string;
  userName: string | null;
  userEmail: string | null;
};

type UserContextType = {
  user: User | null;
  addUser: (data: User) => void;
  removeUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContext");
  }
  return context;
};

type UserProviderType = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [user, setUser] = useState(null);

  const addUser = function (data: any) {
    setUser(data);
  };

  const removeUser = function () {
    setUser(null);
  };

  const values = {
    user,
    addUser,
    removeUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
