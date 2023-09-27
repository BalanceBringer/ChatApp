import axios from 'axios';
import Routes from './Routes.jsx';
import Register from './components/Register';
import {UserContextProvider} from './assets/UserContext';
import { useContext } from 'react';
import { UserContext } from './assets/UserContext';

function App() {
  
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  const {user} = useContext(UserContext);
  console.log(user);

  return (
      <UserContextProvider>
        <Routes/>
      </UserContextProvider>
      
     
  )
}

export default App
