import { useState } from "react";
import { auth } from "./config";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from 'firebase/firestore'
import {db} from '../firebase/config'

export const useSignup=()=>{
    const [error_signup, setError]= useState(null)
    const {dispatch}= useAuthContext()

    const signup=async (email, password)=>{
        const ref=doc(db,'users',email.split("@")[0]); //create users
        await setDoc(ref,{
            name: email.split("@")[0],
            score:[-1,-1,-1,-1,-1,-1],
        })
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