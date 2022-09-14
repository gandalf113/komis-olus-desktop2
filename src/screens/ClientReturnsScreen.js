import React, { useContext, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { ReturnsContext } from '../context/return-context'
import { decToHex } from '../utils/miscUtils';

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

    const { id: clientId } = useParams();

    useEffect(() => {
        reloadReturns();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Id',
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
            // {
            //     Header: 'Drukuj',
            //     Cell: props => <IconButton onClick={() => openPrintView(props.row.original.id_zwrotu)}>
            //         <PrintIcon/>
            //     </IconButton>
            // },
        ],
        []
    )

    const filteredReturns = filterReturns(allReturns, clientId)

    return (
        <div>
            <DataTable loading={false} tableData={filteredReturns} columns={columns} />
        </div>
    )
}

export default ClientReturnsScreen