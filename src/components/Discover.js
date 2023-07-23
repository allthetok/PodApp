import React, { useState, useRef } from 'react'
import { Button } from '@mui/material'
import Navbar from './Navbar'
import PodcastDiscoverList from './PodcastDiscoverList'


const Discover = ({ userId, handleUserLogout}) => {

    const [finalSearch, setFinalSearch] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [sortOptions, setSortOptions] = useState('FOLLOWER_COUNT')

    const textInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(textInput)
        setFinalSearch(textInput.current.value)
        setFormSubmitted(true)
    }

    return (
        <div>
            <Navbar handleSubmit={handleSubmit} textInput={textInput} handleUserLogout={handleUserLogout}/>
            <div className='filterWrap'>
                <Button onClick={() => setSortOptions('FOLLOWER_COUNT')} variant={sortOptions === 'FOLLOWER_COUNT' ? 'contained' : 'outlined'}>Popular</Button>
                <Button onClick={() => setSortOptions('TRENDING')} variant={sortOptions === 'TRENDING' ? 'contained' : 'outlined'}>Trending</Button>
                <Button onClick={() => setSortOptions('DATE_OF_FIRST_EPISODE')} variant={sortOptions === 'DATE_OF_FIRST_EPISODE' ? 'contained' : 'outlined'}>Newest</Button>
            </div>
            <PodcastDiscoverList sortOptions={sortOptions} userId={userId}/>
        </div>
    )
}

export default Discover