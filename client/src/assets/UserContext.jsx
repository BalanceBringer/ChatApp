import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState('');
    const [id, setId] = useState('');
    useEffect(() => {
        axios.get('/profile').then((res) => {
            setId(res.data.id);
            setUser(res.data.username);
        });
    },[]);

    return(
       <UserContext.Provider value={{user,setUser,id,setId}}>
              {children}
       </UserContext.Provider>
    );
};