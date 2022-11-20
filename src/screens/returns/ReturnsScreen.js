import React, { useState, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReturnsContext } from '../../context/return-context'
import PrintIcon from '@mui/icons-material/Print';
import { DataTable } from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import { decToHex } from '../../utils/misc-utils';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setPath } from '../../redux/screenSlice';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { deleteReturn } from '../clients/ClientReturnsScreen';

const ReturnsScreen = () => {
    const { allReturns, reloadReturns } = useContext(ReturnsContext);

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        _return: null
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openPrintView = (id) => {
        navigate(`/returns/${id}/print`);
    }

    useEffect(() => {
        dispatch(setPath('Zwroty'))
        reloadReturns();
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_zwrotu',
            },
            {
                Header: 'Kod z metki',
                accessor: 'id_przedmiotu',
                Cell: props => <p>{decToHex(props.value)}</p>
            },
            {
                Header: 'Nazwa przedmiotu',
                accessor: 'nazwa',
            },
            {
                Header: 'Kontrahent',
                accessor: 'skrot',
            },
            {
                Header: 'Zwrócona ilość',
                accessor: 'ilosc',
            },
            {
                Header: 'Data zwrotu',
                accessor: 'data',
            },
            {
                Header: 'Drukuj',
                Cell: props => <IconButton onClick={() => openPrintView(props.row.original.id_zwrotu)}>
                    <PrintIcon />
                </IconButton>
            },
            {
                Header: 'Wycofaj',
                Cell: props => <IconButton onClick={() => setDeleteModal({ isOpen: true, _return: props.row.original })}>
                    <DeleteIcon />
                </IconButton>
            },
        ],
        []
    )

    if (!allReturns) return <LoadingSpinner />

    return (
        <>
            <DataTable loading={false} columns={columns} tableData={allReturns} />

            <ConfirmModal
                handleClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                isOpen={deleteModal.isOpen}
                title={deleteModal._return ? `Czy na pewno chcesz usunąć
                zwrot '${deleteModal._return.nazwa}' (${deleteModal._return.zwroconaIlosc} sztuk) od ${deleteModal._return.skrot}?`
                    : 'Czy na pewno chcesz usunąć zwrot?'}
                handleYes={() => deleteReturn(deleteModal._return, () => {
                    reloadReturns();
                    setDeleteModal({ isOpen: false, _return: null });
                })}
            />
        </>
    )
}

export default ReturnsScreen