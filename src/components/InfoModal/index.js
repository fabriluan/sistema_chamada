import { InfoModalSt } from './styleIM';
import { IoClose } from 'react-icons/io5';

function InfoModal({conteudo, close}){

    return(
        <InfoModalSt>
            <div className='info'>
                <button onClick={ close }>Voltar</button>

                <h2>Detalhes do chamados</h2>

                <span><b>Cliente: </b> {conteudo.cliente}</span>
                <div className='info_group'><span><b>Assunto: </b> {conteudo.assunto}</span>
                <span><b>Cadastrado em: </b> {conteudo.createdFormat}</span></div>
                <span><b>Status: </b> {conteudo.status}</span>

                {conteudo.complemento !== '' &&(
                    <span><b>Complemento: </b> <p>{conteudo.complemento}</p></span>
                )}

            </div>
        </InfoModalSt>
    )
}

export default InfoModal;