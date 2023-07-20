import React, { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import PodcastDetail from './PodcastDetail'

const Home = ({ userId }) => {
    const [finalSearch, setFinalSearch] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

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
            <Navbar handleSubmit={handleSubmit} textInput={textInput} handleClick={handleClick}/>
            {formSubmitted 
                ? <PodcastDetail userId={userId} finalSearch={finalSearch} />
                : <></>
            }
        </>
    )
}

export default Home