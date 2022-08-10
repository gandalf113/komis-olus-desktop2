import { createContext, useState } from "react";

export const ContractContext = createContext();

const ContractProvider = props => {
    const [currentContractID, setCurrentContractID] = useState();


    return <ContractContext.Provider value={{ currentContractID, setCurrentContractID }}>
        {props.children}
    </ContractContext.Provider >
}

export default ContractProvider