import React from 'react'
import { useTable } from 'react-table'
import "../table.css"

const DataTable = () => {
    const data = React.useMemo(
        () => [
            {
                id: '1',
                name: 'Jan Kowalski',
                tel: '123456789',
            },
            {
                id: '2',
                name: 'Agata Szymiczek',
                tel: '123456789',
            },
            {
                id: '3',
                name: 'Janusz Szymrany',
                tel: '123456789',
            },
            {
                id: '4',
                name: 'Elżbieta Bąk',
                tel: '123456789',
            },
            {
                id: '5',
                name: 'Paweł Szczepaniuk',
                tel: '123456789',
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Imię i nazwisko',
                accessor: 'name',
            },
            {
                Header: 'Numer Telefonu',
                accessor: 'tel',
            },
            {
                Header: 'Umowy',
                accessor: 'contracts',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <table {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default DataTable