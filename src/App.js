import { Routes, Route } from 'react-router-dom'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}

export default App
