import React from 'react'
import './EpisodePreview.css'
import filter from '../mockdata/filter'
import {MoreVert, PlaylistAdd} from '@mui/icons-material'

const EpisodePreview = () => {
	return (
		<div className='videoCard'>
            <div className='likesAdd'><PlaylistAdd className='videoIcon'/></div>
			<img className='videoImg' src={filter.data.podcasts.data[0].imageUrl}/>
            <div className='duration'>
                {filter.data.podcasts.data[0].avgEpisodeLength}
            </div>
			<div className='videoData'>
            <div className='channelDetails'>
            <h5>{filter.data.podcasts.data[0].title}</h5>
            <p className='c_name'><img className='twitter' src='icons8-twitter.svg'/> {filter.data.podcasts.data[0].socialLinks.twitter}</p>
            <p>{filter.data.podcasts.data[0].avgEpisodeLength} Length</p>
            </div>
            <MoreVert className='moreIcon'/>
			</div>
		</div>
	)
}

export default EpisodePreview