import React, { useState } from 'react'
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAsyncDebounce } from 'react-table';

const SearchBar = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {

    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);

    const handleChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <OutlinedInput
            sx={{ height: 36, width: '100%' }}
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value);
                handleChange(e.target.value)
            }}
            placeholder={`Przeszukaj ${count} pozycji..`}
            endAdornment={
                <InputAdornment position='end'>
                    <SearchIcon />
                </InputAdornment>}
        />
    )
}

export default SearchBar