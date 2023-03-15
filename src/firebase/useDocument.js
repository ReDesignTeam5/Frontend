import { useEffect, useState, useRef } from "react";
import {db} from './config'
import {doc, onSnapshot,getDoc} from 'firebase/firestore'

export const useDocument=(c,d)=>{
    const [document, setDocument]=useState(null);
    useEffect(()=>{
        let ref= doc(db,c,d);
        const unsub=onSnapshot(ref,(doc)=>{
            setDocument(doc.data()) 
        })
        return ()=>unsub()
    },[c,d])
    return {document}
}