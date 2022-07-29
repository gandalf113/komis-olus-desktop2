import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { getSalesData, getSalesDataByMonth } from '../../redux/databaseSlice';
import { toggleNewSaleModal } from '../../redux/modalSlice';
import { loadSalesDay, setScreen, setNavbarTitle } from '../../redux/screenSlice';
import { fullDateToString } from '../../utils/dateUtils';

const SalesMonthViewScreen = () => {
    const dispatch = useDispatch()

    const { salesData, loading } = useSelector(state => state.database)
    const { currentSalesMonth } = useSelector(state => state.screen)

    const [days, setDays] = useState([])

    useEffect(() => {
        dispatch(setNavbarTitle('sprzedaż'))
        dispatch(getSalesDataByMonth(currentSalesMonth))
        // dispatch(getSalesData())
    }, [dispatch])

    useEffect(() => {
        // Pobierz unikalną listę dni handlowych
        let dayList = [...new Set(salesData.map(sale => sale.data))]

        // Przekonwertuj ją na listę obiektów
        var dayObjects = dayList.map(day => ({
            "data": day
        }))

        setDays(dayObjects)
    }, [salesData])

    function openModal() {
        dispatch(toggleNewSaleModal(true))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Dzień',
                accessor: 'data',
                Cell: props => <>{fullDateToString(props.value)}</>
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        dispatch(loadSalesDay(props.row.original.data))
                        dispatch(setScreen('sprzedaz_dzien'))
                    }}
                    color="secondary">Zobacz sprzedaż</Typography>

            },
        ],
        [dispatch]
    )

    return (
        <div>
            {/* <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button> */}
            <DataTable loading={loading} tableData={days} columns={columns} />
        </div>
    )
}

export default SalesMonthViewScreen