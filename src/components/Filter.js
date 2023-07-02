import React, { useState } from 'react'
import { Button, Autocomplete, TextField } from '@mui/material'
import './Filter.css';
import EpisodeList from './EpisodeList';

const Filter = ({ podchaserId }) => {
    const [options, setOptions] = useState('5')
    const [sortOptions, setSortOptions] = useState('AIR_DATE')
    const numOptions = ['5', '10', '25']

  return (
    <>
    <div className='filterWrap'>
        <Button onClick={() => setSortOptions('AIR_DATE')} variant={sortOptions === 'AIR_DATE' ? 'contained' : 'outlined'}>Released</Button>
        <Button onClick={() => setSortOptions('ALPHABETICAL')} variant={sortOptions === 'ALPHABETICAL' ? 'contained' : 'outlined'}>Alphabetical</Button>
        <Button onClick={() => setSortOptions('RELEVANCE')} variant={sortOptions === 'RELEVANCE' ? 'contained' : 'outlined'}>Relevance</Button>
        <Autocomplete className='autoComp' disablePortal id='combo-box' options={numOptions} sx={{ width: 150, bgcolor: 'white'}} renderInput={(params) => <TextField {...params} label="Count"/>}
        onChange={(value) => setOptions(value)}
        />
    </div>
    <EpisodeList podchaserId={podchaserId} options={options} sortOptions={sortOptions}/>
    </>
  )
}

export default Filter