import React from 'react'
import PodcastPreview from './components/PodcastPreview'
import EpisodeList from './components/EpisodeList'

const App = () => {
	return (
		<div>
			<h1>Podcast Finder</h1>
			<PodcastPreview/>
			<EpisodeList/>
		</div>
	)
}

export default App