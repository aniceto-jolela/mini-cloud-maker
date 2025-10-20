import {useState} from "react";

export function useAuth(){
    const [user, setUser] = useState(localStorage.getItem("user") || null);

    const login = (username) => {
        localStorage.setItem("user", username);
        setUser(username);
    }

    const logout =()=>{
        localStorage.removeItem("user");
        setUser(null);
    };

    return {user, login, logout};
}