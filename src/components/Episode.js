import React from 'react'
import './PodcastPreview.css'
import {MoreVert, PlaylistAdd} from '@mui/icons-material'

const Episode = ({key, imageUrl, url, length, title, airDate}) => {

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds/3600)
        const mins = Math.floor(seconds % 3600 / 60)
        const hoursDisplay = hours > 0 ? `${hours}h` : ''
        const minsDisplay = mins > 0 ? `${mins}m` : ''
        if (seconds < 60) {
            return `${seconds}s`
        }
        else if (seconds > 60) {
            if (hoursDisplay === '') {
                return minsDisplay
            }
            if (minsDisplay === '') {
                return hoursDisplay
            }
        }
    return `${hoursDisplay}:${minsDisplay}`
        
    }

    const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric'})

	return (
        <li key={key}>
            <div className='videoCard'>
                <div className='likesAdd'><PlaylistAdd className='videoIcon'/></div>
                <a title='Play' target='_blank' rel='noopener noreferrer' href={url}>
                {imageUrl !== '' 
                ? <img className='videoImg' src={imageUrl} alt={title}/>
                : <img className='videoImg' alt='No thumbnail found'/>
                }

                </a>
                <div className='duration'>
                    {formattedTime(length)}
                </div>
                <div className='videoData'>
                    <div className='moreDetails'>
                        <h5 className='title'>{title}</h5>
                        <p className='aired'>{formattedDateLong(airDate)}</p>
                    </div>
                    <MoreVert className='moreIcon'/>
                </div>
            </div>
        </li>
	)
}

export default Episode