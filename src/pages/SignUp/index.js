import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { AuthContext } from "../../contexts/user";
import { ButtonLogin, Container_Sing, Login } from "../SignIn/styleSI";

function SingUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { RegisterUser, loadingAuth } = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();
        
        if(nome !== '' && email !== '' && password !== ''){
            RegisterUser(email, password, nome)
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
                        <h2>Criar conta</h2>

                        <input type="text" placeholder="Digite o seu nome" value={nome} onChange={(e)=> setNome(e.target.value)} />
                        <input type="text" placeholder="Digite o seu email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="password" placeholder="Digite a sua senha" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <ButtonLogin 
                        isOn={email && password && nome} 
                        disabled={!email || !password || !nome}
                        onClick={handleSubmit} 
                        type="submit">{loadingAuth ? 'Carregando...' : 'Cadastar'}</ButtonLogin>
                    </form>

                    <Link to='/'>Já possui uma conta? Entre</Link>
                </Login>
            </div>
        </Container_Sing>
    )
}

export default SingUp;