import { createContext, useState } from "react";

export const ReturnsContext = createContext({});

const ReturnsProvider = props => {
    const [allReturns, setAllReturns] = useState([]);

    const [currentItem, setCurrentItem] = useState();

    const reloadReturns = () => {
        window.api.getReturns().then(returns => {
            setAllReturns(returns);
        })
    }

    return <ReturnsContext.Provider value={{
        allReturns, reloadReturns, currentItem, setCurrentItem
    }}>
        {props.children}
    </ReturnsContext.Provider >
}

export default ReturnsProvider