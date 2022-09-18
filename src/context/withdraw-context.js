import { createContext, useState } from "react";

export const WithdrawContext = createContext();

const WithdrawProvider = props => {
    const [allWithdraws, setAllWithdraws] = useState([]);


    const reloadWithdraws = () => {
        window.api.getWithdraws().then(withdraws => {
            setAllWithdraws(withdraws);
        });
    }

    return <WithdrawContext.Provider value={{ allWithdraws, reloadWithdraws }}>
        {props.children}
    </WithdrawContext.Provider>
}

export default WithdrawProvider;