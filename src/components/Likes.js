import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Autocomplete, TextField } from '@mui/material'
import Navbar from './Navbar'
import PodcastLikeList from './PodcastLikeList'
import EpisodeLikeList from './EpisodeLikeList'
import './Filter.css';


const Likes = ({ userId, handleUserLogout }) => {
    const [finalSearch, setFinalSearch] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [sortOptions, setSortOptions] = useState('PODCAST')

    const textInput = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(textInput)
        setFinalSearch(textInput.current.value)
        setFormSubmitted(true)
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/likes')
    }

    return (
        <>
            <Navbar handleSubmit={handleSubmit} textInput={textInput} handleClick={handleClick} handleUserLogout={handleUserLogout}/>
            <div className='filterWrap'>
                <Button onClick={() => setSortOptions('PODCAST')} variant={sortOptions === 'PODCAST' ? 'contained' : 'outlined'}>Podcasts</Button>
                <Button onClick={() => setSortOptions('EPISODE')} variant={sortOptions === 'EPISODE' ? 'contained' : 'outlined'}>Episodes</Button>
            </div>
            {
                sortOptions === 'EPISODE' ?
                <EpisodeLikeList userId={userId} sortOptions={sortOptions} />
                : 
                <PodcastLikeList userId={userId} sortOptions={sortOptions}/>
            }
        </>
    )
}

export default Likes