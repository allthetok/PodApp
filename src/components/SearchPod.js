import React, { useState, useRef, createContext, useEffect } from 'react'
import './SearchPod.css';
import PodcastDetail from './PodcastDetail';

export const SearchContext = createContext(null)

const SearchPod = () => {
  const [finalSearch, setFinalSearch] = useState('')

  const textInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFinalSearch(textInput.current.value)
  }

  return (
    <SearchContext.Provider value={finalSearch}>
      <div className='searchWrap'>
          <form className='searchBar' onSubmit={handleSubmit}>
              <input type='text' ref={textInput} required placeholder='Search...' />
                  <button className='searchBtn'>
                      <span>Search</span>
                  </button>
          </form>
      </div>
      {finalSearch !== '' ?
             <PodcastDetail />
      : <></>
    }
    </SearchContext.Provider>
  )
}

export default SearchPod