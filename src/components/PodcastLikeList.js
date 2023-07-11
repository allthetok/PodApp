import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PodcastLike from './PodcastLike.js'
import './EpisodeList.css';

const PodcastLikeList = ({ userId }) => {
    const [podLikeDataFetch, setPodLikeDataFetch] = useState(null)

    const getUserLikes = async () => {
        const userLikesConfig = {
            method: 'post',
            url: 'http://localhost:3002/api/likes',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'lnguserid': userId
            },
        }

        await axios(userLikesConfig).then(response => {
            setPodLikeDataFetch(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserLikes(userId)
    }, [userId])

    return (
        <>
        <div className='episodeContainer'>
        {podLikeDataFetch === null
        ? 
            <div>{userId}</div> 
        :
            <ul className='episodeList regular'>
                {podLikeDataFetch.map((podlike) => 
                    <PodcastLike key={podlike.strpodchaserid} 
                        strtitle={podlike.strtitle} 
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