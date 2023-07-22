import React, { useState } from 'react'
import { Button, Autocomplete, TextField } from '@mui/material'
import './Filter.css';
import EpisodeList from './EpisodeList';

const Filter = ({ podchaserId, userId, podTitle }) => {
    const [options, setOptions] = useState('10')
    const [sortOptions, setSortOptions] = useState('AIR_DATE')
    const numOptions = ['5', '10', '20']

    const onTextChange = (event, values) => {
      event.preventDefault()
      setOptions(values)
    }

  return (
    <>
    <div className='filterWrap'>
        <Button onClick={() => setSortOptions('AIR_DATE')} variant={sortOptions === 'AIR_DATE' ? 'contained' : 'outlined'}>Released</Button>
        <Button onClick={() => setSortOptions('ALPHABETICAL')} variant={sortOptions === 'ALPHABETICAL' ? 'contained' : 'outlined'}>Alphabetical</Button>
        <Button onClick={() => setSortOptions('RELEVANCE')} variant={sortOptions === 'RELEVANCE' ? 'contained' : 'outlined'}>Relevance</Button>
        <Autocomplete className='autoComp' disablePortal id='combo-box' options={numOptions} onChange={onTextChange} sx={{ width: 150, bgcolor: 'white'}} renderInput={(params) => <TextField {...params} label="Count"/>}
        // onChange={(value) => setOptions(value)}
        />
    </div>
    <EpisodeList podchaserId={podchaserId} podTitle={podTitle} options={options} sortOptions={sortOptions} userId={userId}/>
    </>
  )
}

export default Filter