import { createContext, useState } from "react";

export const ClientContext = createContext();

const ClientProvider = props => {
    const [allClients, setAllClients] = useState([]);

    const [currentlyEditetClient, setCurrentlyEditetClient] = useState();

    const reloadClients = () => {
        window.api.getClients().then(clients => {
            setAllClients(clients);
        })
    }

    return <ClientContext.Provider value={{
        allClients, reloadClients,
        currentlyEditetClient, setCurrentlyEditetClient
    }}>
        {props.children}
    </ClientContext.Provider>
}

export default ClientProvider