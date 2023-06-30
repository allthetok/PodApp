import React from 'react'
import Episode from './Episode'
import episodes from '../mockdata/podepisodes'
import './EpisodeList.css';

const EpisodeList = () => {
  return (
    <div className='episodeContainer'>
        <ul className='episodeList regular'>
            {episodes.data.podcast.episodes.data.map((episode) => 
                <Episode key={episode.id} imageUrl={episode.imageUrl} url={episode.url} length={episode.length} title={episode.title} airDate={episode.airDate}/>
            )}
        </ul>
    </div>
  )
}

export default EpisodeList