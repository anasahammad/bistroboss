import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log('currentUser', currentUser);
            setLoading(false)
        });
        return ()=>{
            return unsubscribe()
        }
    }, [])

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
        updateUser
    }
    return (
        <AuthContext.Provider value ={ authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;