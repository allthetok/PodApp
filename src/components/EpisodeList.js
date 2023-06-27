import React from 'react'
import Episode from './Episode'
import episodes from '../mockdata/podepisodes'

const EpisodeList = () => {
  return (
    <div>
        <ul className='episodeList'>
            {episodes.data.podcast.episodes.data.map((episode) => 
                <Episode key={episode.id} imageUrl={episode.imageUrl} length={episode.length} title={episode.title} airDate={episode.airDate}/>
            )}
        </ul>
    </div>
  )
}

export default EpisodeList