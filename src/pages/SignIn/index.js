import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { AuthContext } from "../../contexts/user";
import { ButtonLogin, Container_Sing, Login } from "./styleSI";

function SingIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { LoginUser, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        
        if(email !== '' && password !== '' ){
            LoginUser(email, password);
        }
    }

    return(
        <Container_Sing>
            <div className="center">
                <Login>
                    <div className="logo">
                        <img src={logo} alt="Logo do sistema" />
                    </div>

                    <form>
                        <h2>Entrar</h2>

                        <input type="text" placeholder="Digite o seu email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="password" placeholder="Digite a sua senha" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <ButtonLogin 
                        isOn={email && password}
                        disabled={!email || !password}
                        onClick={handleSubmit} 
                        type="submit"> {loadingAuth ? 'Carregando...' : 'Acessar'} </ButtonLogin>
                    </form>

                    <Link to='/register'>Criar uma conta</Link>
                </Login>
            </div>
        </Container_Sing>
    )
}

export default SingIn;