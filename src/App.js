import React, { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
import PodcastLikeList from './components/PodcastLikeList';
import Navbar from './components/Navbar';


const App = () => {
	const [userId, setUserId] = useState(null)

	const handleUserIdChange = (resUserId) => {
		setUserId(resUserId)
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login handleIdChange={handleUserIdChange} userId={userId} />}/>
				<Route path='/home' element={<Navbar userId={userId} />} />
				<Route path='/signup' element={<Signup handleIdChange={handleUserIdChange} userId={userId} />} />
				<Route path='/likes' element={<PodcastLikeList userId={userId} />} />
				<Route path='/navbar' element={<Navbar userId={userId}/>} />
			</Routes>
		</BrowserRouter>

	)
}

export default App