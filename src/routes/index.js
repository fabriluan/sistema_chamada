import { Routes, Route } from "react-router-dom";
import RouteWrapper from './Route';

import SingIn from "../pages/SignIn";
import SingUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import New from "../pages/New";

export default function RoutesComp(){
    return(
        <Routes>
            <Route path="/" element={<RouteWrapper loggedComponent={ <Dashboard/> } defaultComponent={ <SingIn/> } />} />
            <Route path="/register" element={<RouteWrapper loggedComponent={ <Dashboard/> } defaultComponent={ <SingUp/> } />} />
            <Route path="/dashboard" element={<RouteWrapper loggedComponent={ <Dashboard/> } defaultComponent={ <SingIn/>} />} IsPrivate />
            <Route path="/profile" element={<RouteWrapper loggedComponent={ <Profile/> } defaultComponent={ <SingIn/>} />} IsPrivate />
            <Route path="/customers" element={<RouteWrapper loggedComponent={ <Customers/> } defaultComponent={ <SingIn/>} />} IsPrivate />
            <Route path="/new" element={<RouteWrapper loggedComponent={ <New/> } defaultComponent={ <SingIn/>} />} IsPrivate />
            <Route path="/new/:id" element={<RouteWrapper loggedComponent={ <New/> } defaultComponent={ <SingIn/>} />} IsPrivate />
            
        </Routes>
    )
}