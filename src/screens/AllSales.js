import React, { useEffect, useState, useMemo, useContext } from 'react'
import { DataTable } from '../components/DataTable';
import { SalesContext } from '../context/sales-context';
import { toCurrency } from '../utils/miscUtils';

const AllSales = () => {
    // const [sales, setSales] = useState();

    const { allSales: sales, reloadSales } = useContext(SalesContext);

    useEffect(() => {
        reloadSales();
    }, []);

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

    if (!sales) return <>Oyyy</>


    return (
        <div>
            <DataTable loading={false} tableData={sales} columns={columns} />
        </div>
    )
}

export default AllSales