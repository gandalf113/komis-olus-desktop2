import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { toggleNewSaleModal } from '../redux/modalSlice';
import { toCurrency } from '../utils/miscUtils';
import { useParams } from 'react-router-dom';


const DailySales = () => {
    const dispatch = useDispatch()

    const [sales, setSales] = useState();

    const { date, day } = useParams();


    const fullDate = () => {
        // return month + '-' + day
        return `${date}-${day}`
    }

    useEffect(() => {
        console.log(fullDate())
        window.api.getDailySales(fullDate()).then(res => {
            console.log(res)
            setSales(res)
        }).catch(error => {

            alert('fuck');
            console.log(error);
        })
    }, [])

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

    if (!sales) return <div>oops</div>;

    return (
        <div>
            {/* <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, marginBottom: 3 }}>
                <Typography align='justify' variant="h5">
                    {fullDateToString(currentSalesDay)}
                </Typography>
            </Box> */}
            <DataTable loading={false} tableData={sales} columns={columns} />
            <Button variant='contained'
                sx={{ marginTop: 3 }}
                onClick={() => {
                }}>Podsumowanie</Button>
        </div>
    )
}

export default DailySales