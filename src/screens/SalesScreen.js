import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/DataTable'
import { getSalesData } from '../redux/databaseSlice';
import { toggleNewSaleModal } from '../redux/modalSlice';
import { yearAndMonthToString } from '../utils/date-utils';

const SalesScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [months, setMonths] = useState([]);

    useEffect(() => {
        window.api.getSalesWithItems().then(sales => {
            // Pobierz unikalną listę miesięcy połączonym z rokiem, np. [07-2022, 08-2022]
            let monthList = [...new Set(sales.map(sale => {
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
        })
    }, [])

    function openModal() {
        dispatch(toggleNewSaleModal(true));
    }

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
        [dispatch]
    )

    return (
        <div>
            {/* <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button> */}
            <DataTable loading={false} tableData={months} columns={columns} />
        </div>
    )
}

export default SalesScreen