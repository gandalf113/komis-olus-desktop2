import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { getSalesData } from '../../redux/databaseSlice';
import { loadSalesMonth, setScreen, setNavbarTitle } from '../../redux/screenSlice';
import { yearAndMonthToString } from '../../utils/dateUtils';

const SalesScreen = () => {
    const dispatch = useDispatch()

    const { salesData, loading } = useSelector(state => state.database)

    const [months, setMonths] = useState([])

    useEffect(() => {
        dispatch(setNavbarTitle('sprzedaż'))
        dispatch(getSalesData())
    }, [dispatch])

    useEffect(() => {
        // Pobierz unikalną listę miesięcy połączonym z rokiem, np. [07-2022, 08-2022]
        let monthList = [...new Set(salesData.map(sale => {
            const date = new Date(sale.data)
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
    }, [salesData])


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
                        dispatch(loadSalesMonth(props.row.original.miesiac))
                        dispatch(setScreen('sprzedaz_miesiac'))
                    }}
                    color="secondary">Otwórz miesiąc</Typography>

            },
        ],
        [dispatch]
    )

    return (
        <div>
            {/* <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button> */}
            <DataTable loading={loading} tableData={months} columns={columns} />
        </div>
    )
}

export default SalesScreen