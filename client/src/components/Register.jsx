import React, { useContext, useState } from 'react';
import axios from 'axios';
import  {UserContext}  from '../assets/UserContext.jsx';

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser,setId} = useContext(UserContext);
    
    async function register(ev) {
        ev.preventDefault();
        const {data} = await axios.post('/register', {username, password});
        console.log(data);
        setUser(username);
        setId(data.id);
    };
    
    return(

        //The base of the registration page
        <div className="bg-blue-200 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={register}>
                <input 
                    value={username} //This sets the value of the username to the value of the username state
                    onChange={ev => setUsername(ev.target.value)} //This updates the username state when the user types in the username field
                    type="text" 
                    placeholder="username" 
                    className="block w-full rounded p-2 mb-2 border"/>
                
                <input 
                    value={password}//This sets the value of the password to the value of the password state
                    onChange={ev => setPassword(ev.target.value)}//This updates the password state when the user types in the password field
                    type="password" 
                    placeholder="password" 
                    className="block w-full rounded p-2 mb-2 border"/>
                <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </form>
            
        </div>
    )
}