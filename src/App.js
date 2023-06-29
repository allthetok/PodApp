import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PodcastDetail from './components/PodcastDetail';
import PodcastPreview from './components/PodcastPreview'
import EpisodeList from './components/EpisodeList'

const App = () => {
	return (
		<div>
			<h1>Podcast Finder</h1>
			<PodcastDetail/>
			{/* <PodcastPreview/> */}
			<EpisodeList/>
		</div>
	)
}

export default App