import React from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import "../table.css"
import Modal from 'react-modal'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchBar from './modals/SearchBar';

Modal.setAppElement('#root');

export const DataTable = ({ tableData, columns = {} }) => {
    const data = React.useMemo(
        () => tableData,
        [tableData]
    )

    const tableInstance = useTable({ columns, data },
        useGlobalFilter,
        useSortBy
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state
    } = tableInstance



    return (
        <TableContainer>
            <SearchBar preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter} />
            <Table  {...getTableProps()}>
                <TableHead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps)}>
                                            <Box sx={{ display: 'flex', alignItems: 'end' }}>
                                                {column.render('Header')}
                                                {column.isSorted ? (column.isSortedDesc ?
                                                    <ArrowDropUpIcon />
                                                    :
                                                    <ArrowDropDownIcon />
                                                ) : ""}
                                            </Box>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                </TableHead>
                {/* Apply the table body props */}
                <TableBody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <TableRow {...row.getRowProps()}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <TableCell {...cell.getCellProps()}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })}
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>

    )
}