import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DataTable } from '../../components/DataTable';
import { Tab, Tabs, Typography, Box } from '@mui/material';
import { SalesContext } from '../../context/sales-context';
import { getMonthlySales } from '../../utils/sale-utils';
import { extractDay, fullDateToString, yearAndMonthToString } from '../../utils/date-utils';
import { useDispatch } from 'react-redux';
import { setPath } from '../../redux/screenSlice';
import TabPanel from '../../components/TabPanel';
import MonthlySummary from './MonthlySummary';
import AddSaleButton from '../../components/AddSaleButton';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MonthlySales = () => {
    const { date } = useParams();

    const [days, setDays] = useState();
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { allSales } = useContext(SalesContext);

    /**
     * Pobierz listę sprzedaży dla danego miesiąca
     * i pogrupuj tą sprzedaż wg. dnia
     */
    useEffect(() => {
        const readableDate = yearAndMonthToString(date);
        dispatch(setPath(`Sprzedaż\\${readableDate}`));
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
        <Box sx={{ width: '100%' }}>
            <AddSaleButton />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Sprzedaż" {...a11yProps(0)} />
                    <Tab label="Podsumowanie miesiąca" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {/* Sales */}
            <TabPanel value={tabIndex} index={0}>
                <DataTable loading={false} tableData={days} columns={columns} hideSearchBar />
            </TabPanel>

            {/* Summary */}
            <TabPanel value={tabIndex} index={1}>
                <MonthlySummary />
            </TabPanel>

        </Box>
    )
}

export default MonthlySales