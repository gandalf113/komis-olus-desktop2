import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesDataByDate } from '../../redux/databaseSlice';
import { toCurrency } from '../../utils/miscUtils';
import { setNavbarTitle, setScreen } from '../../redux/screenSlice';

const SalesSummaryScreen = () => {
    const dispatch = useDispatch()

    const { salesData } = useSelector(state => state.database)
    const { currentSalesDay, loading } = useSelector(state => state.screen)

    const [summary, setSummary] = useState({})

    const getSummary = () => {
        /**
         * Zwaraca sumę wartości salesData[key]
         * @param {string} key pole które chcemy zsumować np 'cena' albo 'marza'
         * @returns suma wartości danego pola z salesData
         */
        function getSum(key) {
            var sum = 0
            salesData.forEach(sale => {
                sum += sale[key]
            });
            return sum
        }

        return {
            "ilosc": salesData.length,
            "utarg": getSum('cena'),
            "prowizja": getSum('marza'),
        }
    }

    useEffect(() => {
        setSummary(getSummary())
    }, [currentSalesDay, loading])



    const columns = React.useMemo(
        () => [
            {
                Header: 'Ilość sprzedanych',
                accessor: 'ilosc',
            },
            {
                Header: 'Utarg',
                accessor: 'utarg',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Prowizja',
                accessor: 'prowizja',
                Cell: props => <div> {toCurrency(props.value)} </div>
            }
        ],
        []
    )

    useEffect(() => {
        dispatch(setNavbarTitle(`sprzedaż z dnia ${currentSalesDay}`))
        dispatch(getSalesDataByDate(currentSalesDay))
    }, [dispatch, currentSalesDay])

    return (
        <div>
            <Typography sx={{fontSize: '2rem'}}>Podsumowanie {currentSalesDay}</Typography>
            <h3>Ilość sprzedanych:</h3>
            <p>{summary.ilosc}</p>
            <h3>Sprzedaż:</h3>
            <p>{toCurrency(summary.utarg)}</p>
            <h3>Prowizja:</h3>
            <p>{toCurrency(summary.prowizja)}</p>
            {/* <DataTable loading={loading} columns={columns} tableData={getSummary()} /> */}
        </div>
    )
}

export default SalesSummaryScreen