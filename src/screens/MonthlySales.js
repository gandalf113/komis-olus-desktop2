import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataTable } from '../components/DataTable';
import { Typography } from '@mui/material';
import { SalesContext } from '../context/sales-context';
import { getMonthlySales } from '../utils/sale-utils';
import { extractDay, fullDateToString } from '../utils/date-utils';

const MonthlySales = () => {
    const { date } = useParams();

    const [days, setDays] = useState();

    const navigate = useNavigate();

    const { allSales } = useContext(SalesContext);

    /**
     * Pobierz listę sprzedaży dla danego miesiąca
     * i pogrupuj tą sprzedaż wg. dnia
     */
    useEffect(() => {
        const sales = getMonthlySales(allSales, date);

        // Pobierz unikalną listę dni handlowych
        let dayList = [...new Set(sales.map(sale => sale.data))]

        // Przekonwertuj ją na listę obiektów
        var dayObjects = dayList.map(day => ({
            "data": day
        }))

        setDays(dayObjects)
        // })

    }, [allSales])



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