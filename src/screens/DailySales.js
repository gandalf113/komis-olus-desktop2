import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { DataTable } from '../components/DataTable'
import { toCurrency } from '../utils/miscUtils';
import { useParams } from 'react-router-dom';
import { SalesContext } from '../context/sales-context';

/**
 * Zwraca listę sprzedaży dla danego dnia
 * @param {Array} allSales - cała sprzedaż
 * @param {String} date - data w formacie yyyy-mm-dd
 * @returns {Array} - sprzedaż dla danego dnia
 */
const getDailySales = (allSales, date) => {
    console.log(allSales)
    console.log(date)
    const dailySales = allSales.filter(sale => sale.data === date);
    return dailySales
}


const DailySales = () => {

    const [sales, setSales] = useState();

    const { date, day } = useParams();

    const { allSales } = useContext(SalesContext);

    const fullDate = () => {
        // return month + '-' + day
        return `${date}-${day}`
    }

    useEffect(() => {
        const dailySales = getDailySales(allSales, fullDate());
        setSales(dailySales);
    }, [allSales])


    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id_sprzedazy',
            },
            {
                Header: 'Przedmiot',
                accessor: 'nazwa',

            },
            {
                Header: 'Kwota dla komitenta',
                accessor: 'kwotaDlaKomitenta',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Marża',
                accessor: 'marza',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Cena',
                accessor: 'cena',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Data sprzedaży',
                accessor: 'data',
            },
        ],
        []
    )

    if (!sales) return <div>oops</div>;

    return (
        <div>
            <DataTable loading={false} tableData={sales} columns={columns} />
        </div>
    )
}

export default DailySales