import React from 'react'
import './PodcastDetail.css'
import filter from '../mockdata/searchpod'
import {MoreVert, Padding, PlaylistAdd} from '@mui/icons-material'

const PodcastDetail = () => {

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds/3600)
        const mins = Math.floor(seconds % 3600 / 60)
        const hoursDisplay = hours > 0 ? `${hours}h` : ''
        const minsDisplay = mins > 0 ? `${mins}m` : ''
        return `${hoursDisplay}:${minsDisplay}`
    }

    const formattedDateShort = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', month: 'long'})
    const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric'})




	return (
        <div className='infoContainer'>
            <div className='coverArt'>
                <img className='showCover' src={filter.data.podcasts.data[0].imageUrl}></img>
                <h3>
                    {filter.data.podcasts.data[0].title}
                    <div className='colorBar'>
                    </div>
                </h3>
                <table className='podInfoOuter'>
                    <tbody>
                        <tr>
                            <td className='verticalAlignTop'>
                                <table className='podInfo'>
                                    <tbody>
                                        <tr>
                                            <th className='infoHeader'>Creator</th>
                                            <td colSpan={2} className='creator'>
                                                {filter.data.podcasts.data[0].author.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Type</th>
                                            <td colSpan={2} className='regular'>
                                                Podcast
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Released</th>
                                            <td colSpan={2} className='regular'>
                                                {formattedDateShort(filter.data.podcasts.data[0].startDate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Latest Ep</th>
                                            <td colSpan={2} className='regular'>
                                                {formattedDateLong(filter.data.podcasts.data[0].latestEpisodeDate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader p4'>Rating</th>
                                            <td colSpan={2}>
                                                <span className='avgRating regular'>
                                                    {filter.data.podcasts.data[0].ratingAverage}&nbsp;
                                                </span>
                                                <span className='maxRating regular'>
                                                    /&nbsp; 
                                                    <span>
                                                        5.0&nbsp;
                                                    </span>
                                                </span>
                                                <span className='numRatings'>
                                                    from&nbsp;
                                                    <b>
                                                        <span>{filter.data.podcasts.data[0].ratingCount}&nbsp;</span>
                                                    </b>
                                                    ratings
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Episodes #</th>
                                            <td colSpan={2} className='regular'>
                                                {filter.data.podcasts.data[0].numberOfEpisodes}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Avg Length</th>
                                            <td colSpan={2} className='regular'>
                                                {formattedTime(filter.data.podcasts.data[0].avgEpisodeLength)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Description</th>
                                            <td colSpan={2} className='desc'>
                                                {filter.data.podcasts.data[0].description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='infoHeader'>Launch</th>
                                            <td colSpan={2}>
                                                <a className='mediaSpotify' title='Spotify' target='_blank' href={filter.data.podcasts.data[0].webUrl}></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div className='mediaContainer'>
                <a className='mediaTwitter' title='Twitter' target='_blank' href={`https://twitter.com/${filter.data.podcasts.data[0].socialLinks.twitter}`}> </a>
                <a className='mediaFacebook' title='Facebook' target='_blank' href={`https://facebook.com/${filter.data.podcasts.data[0].socialLinks.facebook}`}> </a>
                <a className='mediaInstagram' title='Instagram' target='_blank' href={`https://instagram.com/${filter.data.podcasts.data[0].socialLinks.instagram}`}> </a>
            </div>
            <div className='colorBar'>
            </div>
        </div>
	)
}

export default PodcastDetail