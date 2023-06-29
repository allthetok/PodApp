import React from 'react'
import './PodcastPreview.css'
import {MoreVert, PlaylistAdd} from '@mui/icons-material'

const Episode = ({key, imageUrl, length, title, airDate}) => {

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds/3600)
        const mins = Math.floor(seconds % 3600 / 60)
        const hoursDisplay = hours > 0 ? `${hours}h` : ''
        const minsDisplay = mins > 0 ? `${mins}m` : ''
        return `${hoursDisplay}:${minsDisplay}`
    }


	return (
        <li key={key}>
            <div className='videoCard'>
                <div className='likesAdd'><PlaylistAdd className='videoIcon'/></div>
                <img className='videoImg' src={imageUrl}/>
                <div className='duration'>
                    {formattedTime(length)}
                </div>
                <div className='videoData'>
                    <div className='moreDetails'>
                        <h5>{title}</h5>
                    <p className='aired'>Aired {airDate.substring(0,10)}</p>
                    </div>
                    <MoreVert className='moreIcon'/>
                </div>
            </div>
        </li>
	)
}

export default Episode