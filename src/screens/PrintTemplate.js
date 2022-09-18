import React from 'react'
import { Box, Typography } from '@mui/material'
import { fullDateToString } from '../utils/date-utils'

const PrintTemplate = ({ children, date }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={25}>Komis Odzieżowy OLUŚ</Typography>
                <Typography fontSize={25}>{date && fullDateToString(date)}</Typography>
            </Box>
            {children}
        </Box>
    )
}

export default PrintTemplate