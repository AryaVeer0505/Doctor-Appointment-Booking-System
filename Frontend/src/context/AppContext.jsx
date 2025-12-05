import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
    
    const currency="$"
    const value = {
        doctors,currency
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
