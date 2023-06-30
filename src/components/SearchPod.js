import React from 'react'
import './SearchPod.css';

const SearchPod = () => {
  return (
    <div className='searchWrap'>
        <form action='' className='searchBar'>
            <input type='search' name='search' pattern='.*\S.*' required />
                <button className='searchBtn' type='submit'>
                    <span>Search</span>
                </button>
        </form>
    </div>

  )
}

export default SearchPod