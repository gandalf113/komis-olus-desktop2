import { createContext, useState } from "react";

export const SalesContext = createContext();

const SalesProvider = props => {
    const [allSales, setAllSales] = useState([]);

    const reloadSales = () => {
        window.api.getSalesWithItems().then(sales => {
            setAllSales(sales);
        })
    }

    return <SalesContext.Provider value={{ allSales, reloadSales }}>
        {props.children}
    </SalesContext.Provider>
}

export default SalesProvider