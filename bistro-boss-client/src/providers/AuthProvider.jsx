import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res=> {
                    
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            console.log('currentUser', currentUser);
            setLoading(false)
        });
        return ()=>{
            return unsubscribe()
        }
    }, [axiosPublic])

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        })
    }

    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }
    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        updateUser,
        googleLogin
    }
    return (
        <AuthContext.Provider value ={ authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;