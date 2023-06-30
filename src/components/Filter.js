import React, { useState } from 'react'
import { Button, Autocomplete, TextField } from '@mui/material'
import './Filter.css';

const Filter = () => {
    const [options, setOptions] = useState('25')
    const [sortOptions, setSortOptions] = useState('Released')
    const numOptions = ['10', '25', '50', '100']

    const handleButtonChange = (sortOption) => {
        setSortOptions(sortOption)
    }

  return (
    <div className='filterWrap'>
        <Button onClick={() => setSortOptions('Released')} variant={sortOptions === 'Released' ? 'contained' : 'outlined'}>Released</Button>
        <Button onClick={() => setSortOptions('Alphabetical')} variant={sortOptions === 'Alphabetical' ? 'contained' : 'outlined'}>Alphabetical</Button>
        <Button onClick={() => setSortOptions('Relevance')} variant={sortOptions === 'Relevance' ? 'contained' : 'outlined'}>Relevance</Button>
        <Button onClick={() => setSortOptions('Trending')} variant={sortOptions === 'Trending' ? 'contained' : 'outlined'}>Trending</Button>
        <Autocomplete className='autoComp' disablePortal id='combo-box' options={numOptions} sx={{ width: 150, bgcolor: 'white'}} renderInput={(params) => <TextField {...params} label="Count"/>}
        onChange={(event, value) => setOptions(value)}
        />
    </div>
  )
}

export default Filter