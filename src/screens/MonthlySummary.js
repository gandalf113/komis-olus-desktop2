import { Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SalesContext } from '../context/sales-context'
import { getMonthlySales } from '../utils/sale-utils'

const getPropertySum = (sales, key) => {
  let sum = 0;

  for (const sale of sales) {
    sum += sale[key]
  }
  return sum
}

const MonthlySummary = () => {
  const { date } = useParams();

  const { allSales } = useContext(SalesContext);

  const [days, setDays] = useState([]);


  useEffect(() => {
    const sales = getMonthlySales(allSales, date);

    const days = sales.reduce((groups, sale) => {
      const date = sale.data

      if (!groups[date]) {
        groups[date] = []
      }

      groups[date].push(sale);
      return groups
    }, {})

    setDays(days)
  }, [allSales])


  return (
    <div>
      {Object.keys(days).map(day => (
        <div>
          <Typography variant='h6'>{day}</Typography>
          <p>Kwota dla komitenta: {getPropertySum(days[day], 'kwotaDlaKomitenta')} zł</p>
          <p>Prowizja: {getPropertySum(days[day], 'marza')} zł</p>
        </div>
      ))}
    </div>
  )
}

export default MonthlySummary