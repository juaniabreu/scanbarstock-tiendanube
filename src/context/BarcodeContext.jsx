import { createContext, useEffect, useState } from "react";

export const BarcodeContext = createContext()

export const BarcodeProvider=({children}) =>{
    const [barcode,setBarcode] = useState();

    useEffect(()=>{

    },[])
    return(
        <BarcodeContext.Provider value={{barcode,setBarcode}}>
            {children}
        </BarcodeContext.Provider>
    )


}