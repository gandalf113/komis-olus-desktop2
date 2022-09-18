import React, { useEffect, useContext } from 'react'
import { DataTable } from '../components/DataTable';
import { SalesContext } from '../context/sales-context';
import { toCurrency } from '../utils/miscUtils';
import EditIcon from '@mui/icons-material/Edit';
import { setSaleModal, toggleEditSaleModal } from '../redux/modalSlice';
import { useDispatch } from 'react-redux';
import { setPath } from '../redux/screenSlice';

const AllSales = () => {
    // const [sales, setSales] = useState();
    const dispatch = useDispatch();

    const { allSales: sales, reloadSales } = useContext(SalesContext);

    useEffect(() => {
        dispatch(setPath('Cała sprzedaż'))
        reloadSales();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id_sprzedazy',
            },
            {
                Header: 'Przedmiot',
                accessor: 'nazwa',

            },
            {
                Header: 'Kwota dla komitenta',
                accessor: 'kwotaDlaKomitenta',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Marża',
                accessor: 'marza',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Cena',
                accessor: 'cena',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Data sprzedaży',
                accessor: 'data',
            },
            {
                Header: 'Edytuj',
                Cell: props => <EditIcon
                    onClick={() => {
                        dispatch(setSaleModal({
                            isOpen: true,
                            edit: true,
                            sale: props.row.original
                        }))
                    }}
                    sx={{ cursor: 'pointer' }} />
            },
        ],
        []
    )

    if (!sales) return <>Oyyy</>


    return (
        <div>
            <DataTable loading={false} tableData={sales} columns={columns} />
        </div>
    )
}

export default AllSales