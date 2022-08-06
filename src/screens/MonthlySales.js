import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataTable } from '../components/DataTable';
import { toCurrency } from '../utils/miscUtils';
import { extractDay, fullDateToString } from '../utils/date-utils';
import { Typography } from '@mui/material';

const MonthlySales = () => {
    const { date } = useParams();

    const [days, setDays] = useState();

    const navigate = useNavigate();


    useEffect(() => {
        window.api.getMonthlySales(date).then(sales => {
            // Pobierz unikalną listę dni handlowych
            let dayList = [...new Set(sales.map(sale => sale.data))]

            // Przekonwertuj ją na listę obiektów
            var dayObjects = dayList.map(day => ({
                "data": day
            }))

            setDays(dayObjects)
        })

    }, [])



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
                        // navigate('`${}')
                        navigate(`${extractDay(props.row.original.data)}`)
                    }}
                    color="secondary">Zobacz sprzedaż</Typography>

            },
        ],
        []
    )
    if (!days) return null;

    return (
        <div>
            <DataTable loading={false} tableData={days} columns={columns} />
        </div>
    )
}

export default MonthlySales