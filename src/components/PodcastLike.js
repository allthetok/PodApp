import React from 'react'
import './PodcastPreview.css'
import {MoreVert, Clear} from '@mui/icons-material'

const PodcastLike = ({strpodchaserid, strname, strweburl, strimageurl, strlatestepisodedate, userId}) => {

    const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric'})
    
	return (
        <li key={strpodchaserid}>
            <div className='videoCard'>
                <div className='likesAdd'><Clear className='videoIcon'/></div>
                <a title='Play' target='_blank' href={strweburl}>
                {strimageurl !== '' 
                ? <img className='videoImg' src={strimageurl}/>
                : <img className='videoImg' alt='No thumbnail found'/>
                }
                </a>
                <div className='videoData'>
                    <div className='moreDetails'>
                        <h5 className='title'>{strname}</h5>
                        <p className='aired'>Latest {formattedDateLong(strlatestepisodedate)}</p>
                    </div>
                    <MoreVert className='moreIcon'/>
                </div>
            </div>
        </li>
	)
}

export default PodcastLike