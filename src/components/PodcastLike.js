import React from 'react'
import './PodcastPreview.css'
import {MoreVert, Clear} from '@mui/icons-material'

const PodcastLike = ({ strpodchaserid, strtitle, strweburl, strimageurl, strlatestepisodedate, userId, handleDelete }) => {

    const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric'})
	return (
        <li>
            <div className='videoCard ptop'>
                <Clear className='likesDelete' style={{ fontSize: '1.5rem' }} onClick={() => handleDelete(userId, strpodchaserid)}/> 
                <a title='Play' target='_blank' rel='noopener noreferrer' href={strweburl}>
                {strimageurl !== '' 
                ? <img className='videoImg' src={strimageurl} alt='Not displayable'/>
                : <img className='videoImg' alt='No thumbnail found'/>
                }
                </a>
                <div className='videoData'>
                    <div className='moreDetails'>
                        <h5 className='title'>{strtitle}</h5>
                        <p className='aired'>Latest {formattedDateLong(strlatestepisodedate)}</p>
                    </div>
                    <MoreVert className='moreIcon' onClick={() => console.log('clicked')}/>
                </div>
            </div>
        </li>
	)
}

export default PodcastLike