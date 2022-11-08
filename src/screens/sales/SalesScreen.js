import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/DataTable'
import { SalesContext } from '../../context/sales-context';
import { yearAndMonthToString } from '../../utils/date-utils';
import { setPath } from '../../redux/screenSlice';
import AddSaleButton from '../../components/AddSaleButton';

const SalesScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [months, setMonths] = useState([]);

    const { allSales: sales, reloadSales } = useContext(SalesContext);

    useEffect(() => {
        dispatch(setPath('Sprzedaż'));
        reloadSales();
    }, [dispatch])

    /**
     * Pogrupuj listę sprzedaży wg. miesiąca
     */
    useEffect(() => {

        // Pobierz unikalną listę miesięcy połączonym z rokiem, np. [07-2022, 08-2022]
        let monthList = [...new Set(sales.map(sale => {
            const date = new Date(sale.data_sprzedazy)
            const month = date.getMonth()
            const year = date.getFullYear()

            // Upewnij się, że miesiąc jest podany w formacie dwucyfrowym
            const monthFormatted = ("0" + (month + 1)).slice(-2)

            return year.toString() + "-" + monthFormatted
        }))]

        // Przekonwertuj ją na listę obiektów
        var monthObjects = monthList.map(day => ({
            "miesiac": day
        }))

        setMonths(monthObjects)
    }, [sales])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Miesiąc',
                accessor: 'miesiac',
                Cell: props => <>{yearAndMonthToString(props.value)}</>
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate(`/sales/${props.row.original.miesiac}`)
                    }}
                    color="secondary">Otwórz miesiąc</Typography>

            },
        ],
        [navigate]
    )

    return (
        <>
            <AddSaleButton />

            {/* <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button> */}
            <DataTable loading={false} tableData={months} columns={columns} hideSearchBar />
        </>
    )
}

export default SalesScreen