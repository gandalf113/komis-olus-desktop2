import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { getSalesData } from '../redux/databaseSlice';
import { toggleNewSaleModal } from '../redux/modalSlice';
import { loadSalesDay, setScreen, setNavbarTitle } from '../redux/screenSlice';

const SalesScreen = () => {
    const dispatch = useDispatch()

    const { salesData, loading } = useSelector(state => state.database)

    const [days, setDays] = useState([])

    useEffect(() => {
        dispatch(setNavbarTitle('sprzedaż'))
        // dispatch(getSalesDataByDate('2022-07-23'))
        dispatch(getSalesData())
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
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        dispatch(loadSalesDay(props.row.original.data))
                        dispatch(setScreen('sprzedaz'))
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

export default SalesScreen