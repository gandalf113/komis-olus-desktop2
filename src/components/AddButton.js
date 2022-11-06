import React from 'react'
import { Button, IconButton, Typography } from '@mui/material'

const AddButton = ({ text, icon, onClick }) => {
  return (
    <IconButton variant='text'  sx={{ marginBottom: 2 }} onClick={onClick}>
      {icon}
      <Typography variant='button'>{text.toUpperCase()}</Typography>
    </IconButton>
  )
}

export default AddButton