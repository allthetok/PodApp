import { useState, useEffect } from 'react'
import axios from 'axios'

const useSearch = (userId, finalSearch) => {
    const [dataFetch, setDataFetch] = useState('')
    const [like, setLike] = useState(true)

    const finalSearchData = JSON.stringify({
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
      })

    const searchConfig = {
        method: 'post',
        url: 'https://api.podchaser.com/graphql',
        headers: { 
          'Authorization': `Bearer ${process.env.REACT_APP_DEVELOPMENT_TOKEN}`, 
          'Content-Type': 'application/json'
        },
        data : finalSearchData
      }

      const likeBtnConfig = {
        method: 'post',
        url: 'http://localhost:3002/api/like',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'lnguserid': userId,
            'strpodchaserid': null
        }
      }
      useEffect(() => {
        axios(searchConfig)
        .then(response => {
            setDataFetch(response.data.data.podcasts.data[0])
            likeBtnConfig.data.strpodchaserid = response.data.data.podcasts.data[0].id
            axios(likeBtnConfig)
            .then(response => {
                setLike(response.data.blnLiked)
                console.log(like)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
      }, [finalSearch, like])

      return [dataFetch, like]
}


export default useSearch