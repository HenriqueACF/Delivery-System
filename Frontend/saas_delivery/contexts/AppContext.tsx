import { createContext, useContext, ReactNode, useState } from "react"
import { Tenant } from "../types/Tenant"

//TYPES
type appContextType = {
    tenant: Tenant | null
    setTenant: (newTenant: Tenant) => void
}

type Props = {
    children: ReactNode
}

const defaultValues: appContextType = {
    tenant: null,
    setTenant: () => null
}

const appContext = createContext<appContextType>(defaultValues)
//HOOK
export const useAppContext = () => useContext(appContext)

//PROVIDER
export const AppContextProvider = ({children}:Props) =>{
    const [tenant, setTenant] = useState<Tenant | null>(null)
    
    return (
        <appContext.Provider value={{tenant, setTenant}}>
            {children}
        </appContext.Provider>
    )
}