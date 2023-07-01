import React, { useState, useRef } from 'react'
import './SearchPod.css';

const SearchPod = () => {
  const textInput = useRef()

  const handleSubmit = () => {
    const finalInput = textInput.current.value
    console.log(finalInput)
  }

  return (
    <div className='searchWrap'>
        <form className='searchBar' onSubmit={handleSubmit}>
            <input type='search' name='search' required placeholder='Search a Podcast' ref={textInput}/>
                <button className='searchBtn' type='submit'>
                    <span>Search</span>
                </button>
        </form>
    </div>

  )
}

export default SearchPod