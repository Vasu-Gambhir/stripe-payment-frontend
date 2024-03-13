import React, { createContext, useContext, useState } from "react";

export interface LoginContextType {
    account: any;
    setAccount: React.Dispatch<React.SetStateAction<any>>;
}
    
  export const LoginContext = createContext<LoginContextType>({} as LoginContextType);
  export const useLoginContext = () => useContext(LoginContext)
interface ContextProviderProps {
children: React.ReactNode
  }

const ContextProvider = ({ children } : ContextProviderProps) => {
  const [account, setAccount] = useState({});

  return (
    <LoginContext.Provider value={{ account, setAccount }}>
      {children}
    </LoginContext.Provider>
  );
};

export default ContextProvider;
