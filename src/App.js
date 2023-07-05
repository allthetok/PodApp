import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPod from './components/SearchPod';
import Login from './components/Login';


const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />}/>
				<Route path='/home' element={<SearchPod />} />
			</Routes>
		</BrowserRouter>

	)
}

export default App