import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const value={}

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
