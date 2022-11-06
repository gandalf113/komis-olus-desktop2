import { PointOfSale } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import React from 'react'
import AddButton from './AddButton'
import { setSaleModal } from '../redux/modalSlice'

const AddSaleButton = () => {
  const dispatch = useDispatch();

  return (
    <AddButton
      text="Nowa sprzedaż"
      icon={<PointOfSale sx={{ marginRight: 1 }} />}
      onClick={() => dispatch(setSaleModal({
        isOpen: true,
        edit: false
      }))}
    />
  )
}

export default AddSaleButton