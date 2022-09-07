import { createContext, useState } from "react";

export const SalesContext = createContext();

const SalesProvider = props => {
    const [allSales, setAllSales] = useState([]);

    const [currentlyEditedSale, setCurrentlyEditedSale] = useState();

    const reloadSales = () => {
        window.api.getSalesWithItems().then(sales => {
            setAllSales(sales);
        })
    }

    return <SalesContext.Provider value={{
        allSales, reloadSales,
        currentlyEditedSale, setCurrentlyEditedSale
    }}>
        {props.children}
    </SalesContext.Provider>
}

export default SalesProvider