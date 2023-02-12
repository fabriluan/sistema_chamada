import Header from "../../components/layout/Header";
import { FaPencilAlt } from "react-icons/fa";
import { CustomersSt } from "../Customers/styleCt";
import Title from "../../components/Title";
import { ButtonLogin } from "../SignIn/styleSI";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/user";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useNavigate, useParams } from "react-router-dom";

function New(){

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const history = useNavigate();

    const [LoadClientes, setLoadClientes] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [clientesSelect, setClientesSelect] = useState(2);
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const [idCustomers, setIdCustomers] = useState(false);


    async function LoadId(lista){
        await getDoc(doc(db, 'chamados', id))
        .then((snapshot)=>{

            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setClientesSelect(index);
            setIdCustomers(true);
        })
        .catch((e)=>{
            console.log(e);
            setIdCustomers(false);
        })
    }



    useEffect(()=>{
        async function LoadClientes(){
            await getDocs(collection(db, 'clientes'))
            .then((snapshot)=>{
                let list = [];

                snapshot.forEach((doc) =>{
                    list.push({
                        id: doc.id,
                        nomeEmpresa: doc.data().nomeEmpresa
                    })
                })

                if(list.length === 0){
                    console.log('Nenhuma empresa registrada');
                    setClientes([ {id: 1, nomeEmpresa: ''} ])
                    setLoadClientes(false);
                    return;
                }

                setClientes(list);
                setLoadClientes(false);

                if(id){
                    LoadId(list);
                }
            })
            .catch(()=>{
                // console.log('Deu ruim')
                setLoadClientes(false);
                setClientes([ {id: 1, nomeEmpresa: ''} ])
            })
        }

        LoadClientes();
    }, [ id ])

    async function HandleChamado(e){
        e.preventDefault();

        if(idCustomers){
            await updateDoc(doc(db, 'chamados', id), {
                cliente: clientes[clientesSelect].nomeEmpresa,
                clienteId: clientes[clientesSelect].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userUid: user.uid
            })
            .then(()=>{
                setComplemento('');
                setClientesSelect(0);
                history('/dashboard');
                
            })
            .catch((e)=>{
                alert('error :' +  e);
            })

            return;
        }

        await addDoc(collection(db, 'chamados'), {
            created: new Date(),
            cliente: clientes[clientesSelect].nomeEmpresa,
            clienteId: clientes[clientesSelect].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userUid: user.uid
        })
        .then(()=>{
            console.log('Certo');
            setComplemento('');
            setClientesSelect(0);
        })
        .catch(()=>[
            console.log('error')
        ])
    }

    function HandleRadio(e){
        setStatus(e.target.value);
    }

    function HandleCliente(e){
        setClientesSelect(e.target.value);
    }

    return(
        <>
            <Header />

            <section className="content">
                <Title text={'Novo Chamado'}>
                    <FaPencilAlt size={'1.3rem'} />
                </Title>

                <CustomersSt onSubmit={ HandleChamado }>
                    <label>Cliente</label>

                    {LoadClientes ? (
                        <input type="text" value="Carregando clientes" disabled={true} />
                    ) : (
                        <select value={clientesSelect} onChange={ HandleCliente }>
                            {clientes.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeEmpresa}
                                    </option>
                                )
                            })}
                        </select>    
                    )}

                    <label>Assunto</label>
                    <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Tecnica">Visita Tecnica</option>
                        <option value="Financeiro">Financeiro</option>
                    </select>

                    <label>Status</label>
                    <div className="status">
                        <input type={'radio'} name='radio' value='Aberto' onChange={ HandleRadio } checked={ status === 'Aberto' } />
                        <span>Em aberto</span>
                        <input type={'radio'} name='radio' value='Progresso' onChange={ HandleRadio } checked={ status === 'Progresso' } />
                        <span>Em progresso</span>
                        <input type={'radio'} name='radio' value='Atendido' onChange={ HandleRadio } checked={ status === 'Atendido' } />
                        <span>Atendido</span>
                    </div>

                    <label>Complementos</label>
                    <textarea 
                        type='text' 
                        placeholder="Digite seu complemento (opcional)" 
                        value={complemento} 
                        onChange={(e) => setComplemento(e.target.value)}>
                    </textarea>

                    <ButtonLogin isOn='true' >{idCustomers ? 'Atualizar' : 'Registrar'}</ButtonLogin>
                </CustomersSt>
            </section>
        </>
    )
}

export default New;