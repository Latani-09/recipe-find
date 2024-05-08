'use client'
import { useRef,useState,useEffect } from "react";

export default function useFirstViewportEntry(ref,observerOptions){
    const [entered,setEntered]=useState(false);
 
    
    useEffect(()=>{
        const observ=useRef(new IntersectionObserver( 
            ([entry])=>setEntered(entry.isIntersecting),
            observerOptions))  ///should be wrapped in use effect hook
        const element=ref.current;
        const ob=observ.current;

        if (entered){
            ob.disconnect();
        }
        if(element && !entered) ob.observe(element)
    },[entered,ref])
    return entered;

}