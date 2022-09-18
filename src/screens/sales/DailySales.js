import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { DataTable } from '../../components/DataTable'
import TabPanel from '../../components/TabPanel';
import { toCurrency } from '../../utils/misc-utils';
import { useParams } from 'react-router-dom';
import { SalesContext } from '../../context/sales-context';
import { setSaleModal } from '../../redux/modalSlice';
import EditIcon from '@mui/icons-material/Edit';
import { setPath } from '../../redux/screenSlice';
import { yearAndMonthToString } from '../../utils/date-utils';
import DailySummary from './DailySummary';

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
    console.log(allSales)
    console.log(date)
    const dailySales = allSales.filter(sale => sale.data === date);
    return dailySales
}


const DailySales = () => {
    const dispatch = useDispatch();
    const { date, day } = useParams();

    const [sales, setSales] = useState();
    const [tabIndex, setTabIndex] = useState(0);

    const { allSales } = useContext(SalesContext);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const fullDate = () => {
        return `${date}-${day}`
    }

    useEffect(() => {
        const readableDate = yearAndMonthToString(date);
        dispatch(setPath(`Sprzedaż\\${readableDate}\\${day} ${readableDate}`))
        const dailySales = getDailySales(allSales, fullDate());
        setSales(dailySales);
    }, [allSales, date, day, dispatch])


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
            {
                Header: 'Edytuj',
                Cell: props => <EditIcon
                    onClick={() => {
                        dispatch(setSaleModal({
                            isOpen: true,
                            edit: true,
                            sale: props.row.original
                        }));
                    }}
                    sx={{ cursor: 'pointer' }} />
            },
        ],
        [dispatch]
    )

    if (!sales) return <div></div>;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Sprzedaż" {...a11yProps(0)} />
                    <Tab label="Podsumowanie dnia" {...a11yProps(1)} />
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