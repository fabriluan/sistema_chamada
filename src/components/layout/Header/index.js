import { useContext } from "react"
import { AuthContext } from "../../../contexts/user"
import avatar from "../../../assets/avatar.png"
import { Link } from "react-router-dom";
import { IoSettingsSharp, IoHomeSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { AsideHeader } from "./styleHd";


export default function Header(){

    const { user } = useContext(AuthContext);

    return(
        <AsideHeader>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
            </div>

            <nav>

                <ul>
    
                    <li><Link to={'/dashboard'}><IoHomeSharp color="#fff" size="1.2rem" />Chamados</Link></li>
                    <li><Link to={'/customers'}><FaUserAlt color="#fff" size="1.2rem" />Clientes</Link></li>
                    <li><Link to={'/profile'}><IoSettingsSharp color="#fff" size="1.2rem" />Configurações</Link></li>

                </ul>

            </nav>

        </AsideHeader>
    )
}