import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { SearchContext } from './SearchPod'
import Filter from './Filter'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Button } from '@mui/material'
import './PodcastDetail.css'

const PodcastDetail = () => {
    const [dataFetch, setDataFetch] = useState('')
    const finalSearch = useContext(SearchContext) 

    const data = JSON.stringify({
        query: `query {
            podcasts(searchTerm: "${finalSearch}", first: 1) {
                paginatorInfo {
                    currentPage,
                    hasMorePages,
                    lastPage,
                },
                data {
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
                    author {
                        name
                    },
                    startDate,
                    reviewCount,
                    imageUrl,
                    socialLinks {
                        twitter,
                        facebook,
                        instagram
                    },
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
            setDataFetch(response.data.data.podcasts.data[0])
        })
        .catch((err) => {
            console.log(err)
        })
    }, [finalSearch])

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds/3600)
        const mins = Math.floor(seconds % 3600 / 60)
        const hoursDisplay = hours > 0 ? `${hours}h` : ''
        const minsDisplay = mins > 0 ? `${mins}m` : ''
        return `${hoursDisplay}:${minsDisplay}`
    }

    const handleClick = () => {
        const likeConfig = {
            method: 'post',
            url: 'http://localhost:3002/api/likes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'id': dataFetch.id,
                'title': dataFetch.title,
                'liked': true
            }
        }
        axios(likeConfig)
        .then(response => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const formattedDateShort = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', month: 'long'})
    const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric'})

	return (
        <div>
            <div className='infoContainer'>
                <div className='coverArt'>
                    <img className='showCover' alt='Cover Art' src={dataFetch.imageUrl}></img>
                    <h3>
                        {dataFetch.title}
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
                                                    {dataFetch === '' ? '' : dataFetch.author.name}
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
                                                    {formattedDateShort(dataFetch.startDate)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader'>Latest Ep</th>
                                                <td colSpan={2} className='regular'>
                                                    {formattedDateLong(dataFetch.latestEpisodeDate)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader p4'>Rating</th>
                                                <td colSpan={2}>
                                                    <span className='avgRating regular'>
                                                        {parseFloat(dataFetch.ratingAverage).toFixed(2)}&nbsp;
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
                                                            <span>{dataFetch.ratingCount}&nbsp;</span>
                                                        </b>
                                                        ratings
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader'>Episodes #</th>
                                                <td colSpan={2} className='regular'>
                                                    {dataFetch.numberOfEpisodes}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader'>Avg Length</th>
                                                <td colSpan={2} className='regular'>
                                                    {formattedTime(dataFetch.avgEpisodeLength)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader'>Description</th>
                                                <td colSpan={2} className='desc'>
                                                    {dataFetch.description}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='infoHeader'>Launch</th>
                                                <td colSpan={2}>
                                                    <a className='mediaSpotify' title='Spotify' target='_blank' href={dataFetch.webUrl}></a>
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
                    <a className='mediaTwitter' title='Twitter' target='_blank' href={`https://twitter.com/${dataFetch === '' ? '' : dataFetch.socialLinks.twitter}`}> </a>
                    <a className='mediaFacebook' title='Facebook' target='_blank' href={`https://facebook.com/${dataFetch === '' ? '' : dataFetch.socialLinks.facebook}`}> </a>
                    <a className='mediaInstagram' title='Instagram' target='_blank' href={`https://instagram.com/${dataFetch === '' ? '' : dataFetch.socialLinks.instagram}`}> </a>
                </div>
                <div className='likeContainer'>
                    <Button onClick={handleClick}variant='contained' startIcon={<FavoriteIcon/>}>
                        Like
                    </Button>
                </div>

            </div>
            {dataFetch !== '' ?
            <Filter podchaserId={dataFetch.id} />
            : <></>
            }

        </div>
	)
}

export default PodcastDetail