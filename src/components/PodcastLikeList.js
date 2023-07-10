import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PodcastLike from './PodcastLike.js'
import './EpisodeList.css';

const PodcastLikeList = ({ userId }) => {
    const [podLikeDataFetch, setPodLikeDataFetch] = useState(null)

    const getUserLikes = async (inpUserId) => {
        const userLikesConfig = {
            method: 'get',
            url: 'http://localhost:3002/api/likes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'lnguserid': inpUserId
            }
        }

        await axios(userLikesConfig).then(response => {
            setPodLikeDataFetch(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // useEffect(() => {
    //     getUserLikes(userId)
    //     console.log(podLikeDataFetch)
    // }, [userId])

    getUserLikes(userId)

    return (
        <>
        <div className='episodeContainer'>
        {podLikeDataFetch === null || userId === null
        ? 
            <div></div> 
        :
            <ul className='episodeList regular'>
                {podLikeDataFetch.map((podlike) => 
                    <PodcastLike key={podlike.strpodchaserid} 
                        strname={podlike.strname} 
                        strweburl={podlike.strweburl} 
                        strimageurl={podlike.strimageurl} 
                        strlatestepisodedate={podlike.strlatestepisodedate} 
                        userId={userId}
                    />
                )}
            </ul>}
        </div>
        </>

    )
}

export default PodcastLikeList