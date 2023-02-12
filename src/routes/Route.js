import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/user";

export default function RouteWrapper({loggedComponent, defaultComponent, IsPrivate}){

    const { singed, loading} = useContext(AuthContext);

    function LoadComponent(){
        if(loading){
            return(
                <div></div>
            )
        }
    
        if(!singed && IsPrivate){
            return <Navigate to='/'/>
        }
        
        if(singed && !IsPrivate){
            return <Navigate to='/dashboard'/>
        }
    }

    LoadComponent()

    return singed ? loggedComponent : defaultComponent;

}