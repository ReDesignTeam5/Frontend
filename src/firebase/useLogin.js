import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useAuthContext} from "./useAuthContext"

export const useLogin=()=>{
    const [error_login, setError]= useState(null)
    const {dispatch}= useAuthContext()

    const login=(email, password)=>{
        setError(null)
        signInWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                dispatch({type:'LOGIN',payload: res.user})
            })
            .catch((err)=>{
                setError(err.message)
            })
    }
    return {error_login, login}
}