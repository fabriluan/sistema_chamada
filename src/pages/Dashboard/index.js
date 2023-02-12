import Header from "../../components/layout/Header";
import Title from "../../components/Title";
import { BsChatDotsFill } from "react-icons/bs";
import { NewCh, TableChSt } from "./styleDh";
import { Link, unstable_HistoryRouter, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';  
import { collection, getDoc, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { ButtonLogin } from "../SignIn/styleSI";
import InfoModal from "../../components/InfoModal";

function Dashboard(){

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [empity, setEmpity] = useState(false);
    const [lastDoc, setLastDoc] = useState();
    const [showInfo, setShowInfo] = useState(false);
    const [detail, setDetail] = useState();

    // const history = unstable_HistoryRouter();

    useEffect(()=>{

        async function LoadChamados(){

            const chamadsRef = collection(db, 'chamados')
    
            const q = query(chamadsRef, orderBy('created', 'desc'), limit(5))
    
            await getDocs(q)
            .then((snapshot)=>{
                UpdateState(snapshot);
            })
            .catch((erro)=>{
                console.log('Deu ruim' + erro);
                setLoadingMore(false);
            })
    
            setLoading(false);
        }

        LoadChamados();

        return () => {

        }
    }, []);

    async function UpdateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let list = [];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    complemento: doc.data().complemento,
                    created: doc.data().created,
                    createdFormat: format( doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    userUid: doc.data().userUid
                })
            });

            const lastDoc = snapshot.docs[snapshot.docs.length -1]; 

            setChamados(chamados => [...chamados, ...list]);
            setLastDoc(lastDoc);

        }else{
            setEmpity(true);
        }

        setLoadingMore(false);
    }

    async function HandleMore(){

        setLoadingMore(true);

        const chamadsRef = collection(db, 'chamados')

        const q = query(chamadsRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(5))

        await getDocs(q)
        .then((snapshot)=>{
            UpdateState(snapshot);
        })
        .catch((e)=>{
            alert('error')
        })
    }

    function ToggleInfo(item){
        setShowInfo(!showInfo);
        setDetail(item); 
    }

    if(loading){
        return(
            <div>
                <Header/>

                <section className="content">
                    <Title text={'Atendimentos aos clientes'}>
                        <BsChatDotsFill size={'1.3rem'}/>
                    </Title>


                    <NewCh isLength={true}>
                        <span>Carregando chamados...</span>
                    </NewCh>  
                </section>
            </div>
        )
    }


    return(
        <>
            <Header/>

            <section className="content">
                <Title text={'Atendimentos aos clientes'}>
                    <BsChatDotsFill size={'1.3rem'}/>
                </Title>

                {chamados.length === 0 ? (
                    <NewCh isLength={true} >
                        <span>Nenhum chamado registrado...</span>
                        <Link to={'/new'}>Novo chamado</Link>
                    </NewCh>
                ) : (
                    <>
                        <NewCh isLength={false}>
                            <Link to={'/new'}>Novo chamado</Link>
                        </NewCh>

                        <TableChSt>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label='Cliente'>{item.cliente}</td>
                                            <td data-label='Assunto'>{item.assunto}</td>
                                            <td data-label='Status'>
                                                <span style={{backgroundColor: item.status === 'Aberto' ? '#3ee026' : '#999'}}>
                                                    {item.status}
                                                </span></td>
                                            <td data-label='Cadastrado'>{item.createdFormat}</td>

                                            <td data-label='#'>
                                                <button className="click_btn" onClick={ () => ToggleInfo(item) } ><FiSearch size={'1.45rem'} color='#ffffff' /></button>
                                                <Link to={`/new/${item.id}`} className="click_btn" ><FiEdit2 size={'1.45rem'} color='#ffffff'/></Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </TableChSt>


                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}

                        {!loadingMore && !empity && <ButtonLogin style={{marginTop: '30px', maxWidth: '200px'}} isOn={true} onClick={ HandleMore }>Carregar mais</ButtonLogin>}
                        
                    </>
                )}


                {showInfo && (
                    <InfoModal conteudo={detail} close={ToggleInfo} />
                )}

            </section>
        </>
    )
}

export default Dashboard;