import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Episode from './Episode.js'
import './EpisodeList.css';

const EpisodeList = ({ podchaserId, options, sortOptions }) => {

  const [episodeDataFetch, setEpisodeDataFetch] = useState('')

  const data = JSON.stringify({
    query: `query {
      podcast(identifier: {id: "${podchaserId}", type: PODCHASER}) {
              id,
              title,
              description,
              webUrl,
              language,
              numberOfEpisodes,
              avgEpisodeLength,
              latestEpisodeDate,
              ratingCount,
              ratingAverage,
              reviewCount,
              imageUrl,
              socialLinks {
                  twitter,
                  facebook,
                  instagram
              },
              episodes(sort: {
                  sortBy: ${sortOptions}
              }, first: 20) {
                  paginatorInfo {
                      count,
                      currentPage,
                      firstItem,
                      hasMorePages,
                      lastItem,
                      lastPage,
                      perPage,
                      total
                  },
                  data {
                      id,
                      title,
                      description,
                      airDate,
                      imageUrl,
                      url,
                      length,
                      explicit
                  }
              }
              
              
          }
  }`,
    variables: {}
  });

  const config = {
    method: 'post',
    url: 'https://api.podchaser.com/graphql',
    headers: { 
      'Authorization': `Bearer ${process.env.REACT_APP_DEVELOPMENT_TOKEN}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };


  useEffect(() => {
    axios(config)
    .then(response => {
      const responseObj = response.data
      if (podchaserId === '') {
        setEpisodeDataFetch({
          'data': {
            'podcast': {
              'episodes': {
                'data': []
              }
            }
          }
        })
      }
      setEpisodeDataFetch(responseObj.data.podcast.episodes.data)
    })
  }, [podchaserId, sortOptions])

  return (
    <>
    <div className='episodeContainer'>
    {episodeDataFetch === '' ? 
    <div></div> :
        <ul className='episodeList regular'>
            {episodeDataFetch.slice(0,parseInt(options)).map((episode) => 
                <Episode key={episode.id} imageUrl={episode.imageUrl} url={episode.url} length={episode.length} title={episode.title} airDate={episode.airDate}/>
            )}
        </ul>}
    </div>
    </>

  )
}

export default EpisodeList