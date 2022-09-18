import { createContext, useState } from "react";

export const ContractContext = createContext();

const ContractProvider = props => {
    const [allContracts, setAllContracts] = useState([]);
    const [currentContractID, setCurrentContractID] = useState();

    const reloadContracts = () => {
        window.api.getContractsWithClients().then(contracts => {
            setAllContracts(contracts);
        })
    }

    return <ContractContext.Provider value={{
        currentContractID, setCurrentContractID,
        allContracts, reloadContracts
    }}>
        {props.children}
    </ContractContext.Provider >
}

export default ContractProvider