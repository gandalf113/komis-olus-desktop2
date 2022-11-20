import { IconButton } from '@mui/material';
import React, { useState, useContext, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { ReturnsContext } from '../../context/return-context'
import { decToHex } from '../../utils/misc-utils';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from '../../components/modals/ConfirmModal';

export const deleteReturn = (_return, handleSuccess) => {
    window.api.deleteReturn(_return.id_zwrotu)
        .then(res => {
            window.api.decrementReturnedAmountBy(_return.id_przedmiotu, _return.zwroconaIlosc)
                .then(res => {
                    handleSuccess();
                })
                .catch(err => {
                    alert("Nie udało się zmienić zwróconej ilości. Zrób to manualnie. Informacje o błędzie w konsoli");
                    console.error(err);
                });
        })
        .catch(err => {
            alert("Nie udało się usunąć zwrotu. Informacje o błędzie w konsoli");
            console.error(err);
        });
}


/**
 * Wyświetl zwroty dla danego klienta
 * @param {Array} allReturns - lista wszystkich zwrotów
 * @param {Number} clientId - id klienta
 */
const filterReturns = (allReturns, clientId) => {
    clientId = Number.parseInt(clientId)
    return allReturns.filter(r => r.id_klienta === clientId);
}

const ClientReturnsScreen = () => {
    const { allReturns, reloadReturns } = useContext(ReturnsContext);

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        _return: null
    });

    const { id: clientId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        reloadReturns();
    }, []);

    const openPrintView = (returnId) => navigate(`/returns/${returnId}/print`);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_zwrotu',
            },
            {
                Header: 'Kod z metki',
                accessor: 'id_przedmiotu',
                Cell: props => <div>{decToHex(props.value)}</div>
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

    const filteredReturns = filterReturns(allReturns, clientId)

    return (
        <>
            <DataTable loading={false} tableData={filteredReturns} columns={columns} />
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

export default ClientReturnsScreen