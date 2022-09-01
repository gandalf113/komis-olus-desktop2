import { Dialog } from '@mui/material'
import React from 'react'

const NewWithdrawModal = ({ isOpen, handleClose }) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            New Withdraw
        </Dialog>
    )
}

export default NewWithdrawModal