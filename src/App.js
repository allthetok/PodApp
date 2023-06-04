import React from 'react'
import filter from './mockdata/filter'
import EpisodePreview from './components/EpisodePreview'

const App = () => {
	return (
		<div>
			<h1>Podcast Finder</h1>
			<EpisodePreview/>
		</div>
	)
}

export default App