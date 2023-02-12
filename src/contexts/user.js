import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, collection, doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{

        const LoadStorage = ()=>{
            const storageUser = localStorage.getItem('@SistUser');
    
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }   

            setLoading(false);  
        }

        LoadStorage();

    }, [])

    async function RegisterUser(email, password, name){
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            await setDoc(doc(db, 'users', uid), {
                nome: name,
                avatarUrl: null,
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data);
                StorageUser(data)
                setLoadingAuth(false);
            })
            .catch((e)=>{
                console.log(e);
                setLoadingAuth(false);
            })
        })
    }

    function StorageUser(data){
        localStorage.setItem('@SistUser', JSON.stringify(data))
    }

    async function LogoutUser(){
        await signOut(auth);
        localStorage.removeItem('@SistUser');
        setUser(null);
    }

    async function LoginUser(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            const docRef = doc(db, 'users', uid);
            const userProfile = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            }

            setUser(data);
            StorageUser(data)
            setLoadingAuth(false);

        })
        .catch((e)=>{
            console.log(e);
            setLoadingAuth(false);
        })
    }

    return(
        <AuthContext.Provider value={{singed: !!user, user, loading, RegisterUser, LogoutUser, LoginUser, loadingAuth, StorageUser, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;