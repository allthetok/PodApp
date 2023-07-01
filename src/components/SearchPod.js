import React, { useState, useRef, useContext, createContext } from 'react'
import './SearchPod.css';
import PodcastDetail from './PodcastDetail';
import Filter from './Filter';
import EpisodeList from './EpisodeList';

export const SearchContext = createContext(null)

const SearchPod = () => {
  const [searchIn, setSearchIn] = useState('')
  const [finalSearch, setFinalSearch] = useState('')

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setSearchIn(e.target.value)
  //   console.log(searchIn)
  // }

  const handleClick = (e) => {
    e.preventDefault()
    setFinalSearch(searchIn)
  }

  const handleChange = (e) => {
    setSearchIn(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <SearchContext.Provider value={finalSearch}>
      <div className='searchWrap'>
          <form className='searchBar' onSubmit={handleSubmit}>
              <input type='search' name='search' required placeholder='Search...' value={searchIn} onChange={handleChange}/>
                  <button className='searchBtn' type='submit' onClick={handleClick}>
                      <span>Search</span>
                  </button>
          </form>
      </div>
      <PodcastDetail/>
			<Filter/>
			<EpisodeList/>
    </SearchContext.Provider>
  )
}

export default SearchPod