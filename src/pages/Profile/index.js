import Header from "../../components/layout/Header";
import Title from "../../components/Title";
import { IoSettingsSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/user";
import { FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { ButtonLogin } from "../SignIn/styleSI";
import { ButtonPfSt, ProfileSt } from "./stylePf";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Profile(){

    const { user, StorageUser, setUser, LogoutUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function HandleFile(e){

        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type == 'image/jpeg' || image.type == 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }else{
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function HandleUpload(){
        const currentUid = user.uid;

        const imgRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        let uploadImg = await uploadBytesResumable(imgRef, imageAvatar)
            .then(async (snapshot)=>{
                console.log('Imagem Enviada');

                getDownloadURL(ref(storage, imgRef))
                    .then(async (url)=>{

                        console.log(url);

                        let urlFoto = url;
                        const userRef = doc(db, 'users', user.uid);

                        await updateDoc(userRef, {
                            avatarUrl: urlFoto,
                            nome: name
                        })
                        .then(()=>{
                            let data = {
                                ...user,
                                nome: name,
                                avatarUrl: urlFoto
                            }

                            setUser(data);
                            StorageUser(data);
                        })
                    })
            })
        
    }

    async function HandleSave(e){
        e.preventDefault(); 

        if(imageAvatar === null && name !== ''){

            const userRef = doc(db, 'users', user.uid);

            await updateDoc(userRef, {
                nome: name
            })
            .then(()=>{
                let data = {
                    ...user,
                    nome: name
                };

                setUser(data);
                StorageUser(data);
            })
            .catch((e)=>{
                console.log(e);
            })

        }else if(imageAvatar !== null && name !== ''){
            HandleUpload();
        }
    }

    return(
        <>
            <Header/>
            
            <section className="content">
                <Title text={'Configurações'}>
                    <IoSettingsSharp size={'1.3rem'} />
                </Title>

                <ProfileSt>
                    <form onSubmit={ HandleSave }>
                        <label className="label_avatar">
                            <span>
                                <FiUpload size={'1.5rem'} color='#fff'/>
                            </span>

                            <input type="file" accept="image/*" onChange={ HandleFile } /><br/>

                            {avatarUrl === null ?
                                <img src={avatar} alt="foto de perfil"/>
                                :
                                <img src={avatarUrl} alt="foto de perfil"/>
                            }  
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={ (e) => setName(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email } onChange={ (e) => setEmail(e.target.value)} disabled='true' />

                        <ButtonLogin isOn={name}>Salvar</ButtonLogin>
                    </form>
                </ProfileSt>
            </section>

            <section className="content">
                <ButtonPfSt>
                    <button className="logout" onClick={ LogoutUser }>Sair</button>
                </ButtonPfSt>
            </section>
        </>
    )
}

export default Profile;