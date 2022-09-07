import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { toCurrency } from '../utils/miscUtils';
import { useParams } from 'react-router-dom';
import { SalesContext } from '../context/sales-context';
import { toggleEditSaleModal } from '../redux/modalSlice';
import EditIcon from '@mui/icons-material/Edit';


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
    const dispatch = useDispatch();

    const [sales, setSales] = useState();

    const { date, day } = useParams();

    const { allSales, setCurrentlyEditedSale } = useContext(SalesContext);

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
            {
                Header: 'Edytuj',
                Cell: props => <EditIcon
                    onClick={() => {
                        // setCurrentlyEditetItem(props.row.original);
                        setCurrentlyEditedSale(props.row.original)
                        dispatch(toggleEditSaleModal(true))
                    }}
                    sx={{ cursor: 'pointer' }} />
            },
        ],
        [dispatch, setCurrentlyEditedSale]
    )

    if (!sales) return <div>oops</div>;

    return (
        <div>
            <DataTable loading={false} tableData={sales} columns={columns} />
        </div>
    )
}

export default DailySales