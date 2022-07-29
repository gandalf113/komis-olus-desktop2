import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { getSalesDataByDate } from '../../redux/databaseSlice';
import { toggleNewSaleModal } from '../../redux/modalSlice';
import { toCurrency } from '../../utils/miscUtils';
import { setNavbarTitle, setScreen } from '../../redux/screenSlice';
import { fullDateToString } from '../../utils/dateUtils';


const SalesDetailScreen = () => {
    const dispatch = useDispatch()

    const { salesData } = useSelector(state => state.database)
    const { currentSalesDay, loading } = useSelector(state => state.screen)

    useEffect(() => {
        dispatch(setNavbarTitle(`sprzedaż z dnia ${currentSalesDay}`))
        dispatch(getSalesDataByDate(currentSalesDay))
    }, [dispatch, currentSalesDay])

    function openModal() {
        dispatch(toggleNewSaleModal(true))
    }

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

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, marginBottom: 3 }}>
                <Typography align='justify' variant="h5">
                    {fullDateToString(currentSalesDay)}
                </Typography>
            </Box>
            <DataTable loading={loading} tableData={salesData} columns={columns} />
            <Button variant='contained'
                sx={{ marginTop: 3 }}
                onClick={() => {
                    dispatch(setScreen('podsumowanie_sprzedazy'))
                }}>Podsumowanie</Button>
        </div>
    )
}

export default SalesDetailScreen