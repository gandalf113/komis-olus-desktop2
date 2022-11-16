import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { DataTable } from '../../components/DataTable'
import { SalesContext } from '../../context/sales-context'
import { getMonthlySales } from '../../utils/sale-utils'
import { toCurrency } from '../../utils/misc-utils'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Box } from '@mui/system'
import { fullDateToString } from '../../utils/date-utils'
import { getPropertySum, getSummary, groupSalesByDate } from '../../utils/summary-utils'


const MonthlySummary = () => {
  const { date } = useParams();

  const { allSales } = useContext(SalesContext);

  const [summary, setSummary] = useState();


  useEffect(() => {
    const sales = getMonthlySales(allSales, date);

    const groupedSales = groupSalesByDate(sales);
    const summary = getSummary(groupedSales);

    setSummary(summary)
  }, [allSales, date])


  const columns = useMemo(
    () => [
      {
        Header: 'Data',
        accessor: 'data',
        Cell: props => <div> {fullDateToString(props.value)} </div>
      },
      {
        Header: 'Kwota dla komitenta',
        accessor: 'kwotaDlaKomitenta',
        Cell: props => <div> {toCurrency(props.value)} </div>
      },
      {
        Header: 'Prowizja',
        accessor: 'prowizja',
        Cell: props => <div> {toCurrency(props.value)} </div>
      },
      {
        Header: 'Sprzedaż',
        Cell: props => <div> {toCurrency(props.row.original.prowizja + props.row.original.kwotaDlaKomitenta)} </div>
      },
    ],
    []
  )

  if (!summary) return <LoadingSpinner />

  return (
    <div>
      <DataTable loading={false} columns={columns} tableData={summary} hideSearchBar/>
      <Box sx={{ marginTop: 2, marginLeft: 1 }}>
        <Typography variant='h6'>RAZEM:</Typography>
        <Typography>Prowizja: {getPropertySum(summary, 'prowizja')} zł</Typography>
        <Typography>Kwota dla komitenta: {getPropertySum(summary, 'kwotaDlaKomitenta')} zł</Typography>
        <Typography>Sprzedaż: {getPropertySum(summary, 'kwotaDlaKomitenta') + getPropertySum(summary, 'prowizja')} zł</Typography>
      </Box>
      {/* {Object.keys(days).map(day => (
        <div>
          <p>Kwota dla komitenta: {getPropertySum(days[day], 'kwotaDlaKomitenta')} zł</p>
          <p>Prowizja: {getPropertySum(days[day], 'marza')} zł</p>
        </div>
      ))} */}
    </div>
  )
}

export default MonthlySummary