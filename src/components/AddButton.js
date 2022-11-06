import React from 'react'
import { Button } from '@mui/material'

const AddButton = ({ text, icon, onClick }) => {
  return (
    <Button variant='text' color='primary' sx={{ marginBottom: 2 }} onClick={onClick}>
      {icon}
      {text}
    </Button>
  )
}

export default AddButton