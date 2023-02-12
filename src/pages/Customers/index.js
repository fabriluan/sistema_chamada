import Header from "../../components/layout/Header";
import Title from "../../components/Title";
import { FaPencilAlt } from "react-icons/fa";
import { ProfileSt } from "../Profile/stylePf";
import { CustomersSt } from "./styleCt";
import { ButtonLogin } from "../SignIn/styleSI";
import { useState } from "react";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

function Customers(){

    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function HandleAdd(e){
        e.preventDefault();
        
        if(nomeEmpresa !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, 'clientes'), {
                nomeEmpresa: nomeEmpresa,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomeEmpresa('')
                setCnpj('')
                setEndereco('')
            })
            .catch(()=>{
                alert('error')
            })
        }else{
            console.log('Preencha')
        }
    }

    return(
        <>
            <Header/>

            <section className="content">
                <Title text={'Clientes'}>
                    <FaPencilAlt size={'1.3rem'} />
                </Title>

                <CustomersSt onSubmit={HandleAdd}>

                    <label>Nome da Empresa</label>
                    <input type="text" value={nomeEmpresa} onChange={(e)=>{setNomeEmpresa(e.target.value)}} />

                    <label>CNPJ</label>
                    <input type="text" value={cnpj} onChange={(e)=>{setCnpj(e.target.value)}} />

                    <label>Endereço</label>
                    <input type="text" value={endereco} onChange={(e)=>{setEndereco(e.target.value)}}/>

                    <ButtonLogin isOn={nomeEmpresa && cnpj && endereco}>Cadastrar</ButtonLogin>

                </CustomersSt>
            </section>
        </>
    )
}

export default Customers;