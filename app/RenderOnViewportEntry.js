'use client'
import { useRef } from "react";
import  useFirstViewportEntry from "./hook/useFirstViewportEntry";
const { Suspense } = require("react");



const  RenderOnViewportEntry=({
    children,threshhold=0,root=null,rootMargin="0px 0px 0px 0px",...wrapperDivProps
})=>{
    const ref=useRef();
    const entered=useFirstViewportEntry(ref,{threshhold,root,rootMargin})
    return <div {...wrapperDivProps} ref={ref}>
        {entered && <Suspense fallback={<div>Loading</div>}>
            {children}
        </Suspense>}
    </div>

}
export default RenderOnViewportEntry;