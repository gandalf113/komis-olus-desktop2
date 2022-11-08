import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DataTable } from '../../components/DataTable'
import { toCurrency } from '../../utils/misc-utils'
import LoadingSpinner from '../../components/LoadingSpinner'
import { fullDateToString } from '../../utils/date-utils'
import { getSummary, groupSalesByDate } from '../../utils/summary-utils'


const DailySummary = ({ sales }) => {
  const { date } = useParams();

  const [summary, setSummary] = useState();

  useEffect(() => {
    const groupedSales = groupSalesByDate(sales);
    const summary = getSummary(groupedSales);

    setSummary(summary)
  }, [sales, date])


  const columns = useMemo(
    () => [
      {
        Header: 'Data',
        accessor: 'data',
        Cell: props => <div> {fullDateToString(props.value)} </div>,
        Footer: <span>test</span>
      },
      {
        Header: 'Marża',
        accessor: 'prowizja',
        Cell: props => <div> {toCurrency(props.value)} </div>
      },
      {
        Header: 'Kwota dla komitenta',
        accessor: 'kwotaDlaKomitenta',
        Cell: props => <div> {toCurrency(props.value)} </div>
      },
      {
        Header: 'Razem',
        Cell: props => <div> {toCurrency(props.row.original.prowizja + props.row.original.kwotaDlaKomitenta)} </div>
      },
    ],
    []
  )

  if (!summary) return <LoadingSpinner />

  return (
    <div>
      <DataTable loading={false} columns={columns} tableData={summary} hideSearchBar />
      {/* <Box sx={{ marginTop: 2, marginLeft: 1 }}>
        <Typography variant='h6'>RAZEM:</Typography>
        <Typography>Prowizja: {getPropertySum(summary, 'prowizja')} zł</Typography>
        <Typography>Kwota dla komitenta: {getPropertySum(summary, 'kwotaDlaKomitenta')} zł</Typography>
      </Box> */}
      {/* {Object.keys(days).map(day => (
        <div>
          <p>Kwota dla komitenta: {getPropertySum(days[day], 'kwotaDlaKomitenta')} zł</p>
          <p>Prowizja: {getPropertySum(days[day], 'marza')} zł</p>
        </div>
      ))} */}
    </div>
  )
}

export default DailySummary