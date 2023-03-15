import { useState } from "react";
import { auth } from "./config";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const [error_signup, setError]= useState(null)
    const {dispatch}= useAuthContext()

    const signup=(email, password)=>{
        setError(null)
        createUserWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                dispatch({type:'LOGIN',payload: res.user})
            })
            .catch((err)=>{
                setError(err.message)
            })
    }
    return {error_signup, signup}
}