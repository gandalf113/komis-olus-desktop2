import { createContext, useState } from "react";

export const ContractContext = createContext();

const ContractProvider = props => {
    const [allContracts, setAllContracts] = useState([]);
    const [currentContractID, setCurrentContractID] = useState();

    // Potrzebne w EditItemModal.js, przechowuje cały obiekt a nie tylko ID
    const [currentlyEditedItem, setCurrentlyEditetItem] = useState();
    const [currentlyEditedContract, setCurrentlyEditedContract] = useState();

    const reloadContracts = () => {
        window.api.getContractsWithClients().then(contracts => {
            setAllContracts(contracts);
        })
    }

    return <ContractContext.Provider value={{
        currentContractID, setCurrentContractID,
        allContracts, reloadContracts,
        currentlyEditedItem, setCurrentlyEditetItem,
        currentlyEditedContract, setCurrentlyEditedContract
    }}>
        {props.children}
    </ContractContext.Provider >
}

export default ContractProvider