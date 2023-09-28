import RegisterLogin from "./components/RegisterLogin"
import { useContext } from "react";
import { UserContext } from "./assets/UserContext.jsx";

export default function Routes() {
    const {user,id} = useContext(UserContext);

    if(user) {
        return "logged in as " + user;
    }
    return (
        <RegisterLogin/>
    );
}