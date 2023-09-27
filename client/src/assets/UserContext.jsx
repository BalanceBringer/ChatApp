import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState('');
    const [id, setId] = useState('');

    return(
       <UserContext.Provider value={{user,setUser,id,setId}}>
              {children}
       </UserContext.Provider>
    );
};