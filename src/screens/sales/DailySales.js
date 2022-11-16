import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { DataTable } from '../../components/DataTable'
import TabPanel from '../../components/TabPanel';
import { decToHex, toCurrency } from '../../utils/misc-utils';
import { useNavigate, useParams } from 'react-router-dom';
import { SalesContext } from '../../context/sales-context';
import { setSaleModal } from '../../redux/modalSlice';
import EditIcon from '@mui/icons-material/Edit';
import { setPath } from '../../redux/screenSlice';
import { yearAndMonthToString } from '../../utils/date-utils';
import DailySummary from './DailySummary';
import AddSaleButton from '../../components/AddSaleButton';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


/**
 * Zwraca listę sprzedaży dla danego dnia
 * @param {Array} allSales - cała sprzedaż
 * @param {String} date - data w formacie yyyy-mm-dd
 * @returns {Array} - sprzedaż dla danego dnia
 */
const getDailySales = (allSales, date) => {
    const dailySales = allSales.filter(sale => sale.data_sprzedazy === date);
    return dailySales
}


const DailySales = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { date, day } = useParams();

    const [sales, setSales] = useState();
    const [tabIndex, setTabIndex] = useState(0);

    const { allSales } = useContext(SalesContext);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const fullDate = useCallback(() => {
        return `${date}-${day}`
    }, [day, date])

    useEffect(() => {
        const readableDate = yearAndMonthToString(date);
        dispatch(setPath(`Sprzedaż\\${readableDate}\\${day} ${readableDate}`))
        const dailySales = getDailySales(allSales, fullDate());
        setSales(dailySales);
    }, [allSales, date, day, dispatch, fullDate])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Ścieżka',
                accessor: 'id_sprzedazy',
                Cell: props => <div> {props.row.original.skrot} | {props.row.original.numer_umowy} | {decToHex(props.row.original.id_przedmiotu)}</div>

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
                Header: 'Prowizja',
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
                accessor: 'data_sprzedazy',
            },
            {
                Header: 'Edytuj',
                Cell: props => <IconButton onClick={() => {
                    dispatch(setSaleModal({
                        isOpen: true,
                        edit: true,
                        sale: props.row.original
                    }));
                }}>
                    <EditIcon />
                </IconButton>
            },
            {
                Header: 'Idź do umowy',
                Cell: props => <IconButton onClick={() => {
                    navigate(`/contracts/${props.row.original.id_umowy}`)
                }}>
                    <ReceiptIcon />
                </IconButton>
            },
        ],
        [dispatch, navigate]
    )

    if (!sales) return <div></div>;

    return (
        <Box sx={{ width: '100%' }}>
            <AddSaleButton />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Sprzedaż" {...a11yProps(0)} />
                    <Tab label="Podsumowanie sprzedaży" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {/* Sales */}
            <TabPanel value={tabIndex} index={0}>
                <DataTable loading={false} tableData={sales} columns={columns} />
            </TabPanel>

            {/* Summary */}
            <TabPanel value={tabIndex} index={1}>
                <DailySummary sales={sales} />
            </TabPanel>

        </Box>
    )
}

export default DailySales