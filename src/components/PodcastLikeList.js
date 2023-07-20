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

        await axios(userLikesConfig)
        .then(response => {
            setPodLikeDataFetch(uniqueFilter(response.data))
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteUserLike = async (userId, strpodchaserid) => {
        const likeDeleteConfig = {
            method: 'delete',
            url: 'http://localhost:3002/api/like',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'lnguserid': userId,
                'strpodchaserid': strpodchaserid
            },
        }

        const response = await axios(likeDeleteConfig)
        if (response.status === 204) {
            await getUserLikes()
        }
    }

    useEffect(() => {
        getUserLikes()
    }, [userId])

    const uniqueFilter = (data) => {
        const map = new Map(data.map(pos => [pos.strpodchaserid, pos]))
        const uniques = [...map.values()]
        return uniques
    }

    return (
        <>
        <div className='episodeContainer'>
        {podLikeDataFetch === null
        ? 
            <div>{userId}</div> 
        :
            <ul className='episodeList regular'>
                {podLikeDataFetch.map((podlike) => 
                    <PodcastLike key={podlike.lnglikeid}
                        strpodchaserid={podlike.strpodchaserid} 
                        strtitle={podlike.strtitle} 
                        strweburl={podlike.strweburl} 
                        strimageurl={podlike.strimageurl} 
                        strlatestepisodedate={podlike.strlatestepisodedate} 
                        userId={userId}
                        handleDelete={deleteUserLike}
                    />
                )}
            </ul>}
        </div>
        </>

    )
}

export default PodcastLikeList