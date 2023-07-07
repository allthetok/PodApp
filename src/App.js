import React, { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPod from './components/SearchPod';
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
	const [userId, setUserId] = useState(null)

	const handleUserIdChange = (resUserId) => {
		setUserId(resUserId)
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login handleIdChange={handleUserIdChange} userId={userId} />}/>
				<Route path='/home' element={<SearchPod userId={userId} />} />
				<Route path='/signup' element={<Signup handleIdChange={handleUserIdChange} userId={userId} />} />
			</Routes>
		</BrowserRouter>

	)
}

export default App