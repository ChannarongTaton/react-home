import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import RegisterComponents from './Components/RegisterComponents'
import LiffComponent from './Components/LiffComponent'
import DoorComponent from './Components/DoorComponent'
const MyRoute=()=> {
        const queryParams = new URLSearchParams(window.location.search);
        const params = queryParams.get('page');
    return(
        <Router>
            <Routes>
                <Route path='*' element={<App params={params}/>}/>
                <Route path="/register" element={<RegisterComponents/>}/>
                <Route path="/liff-home" element={<LiffComponent/>}/>
                <Route path="/home2" element={<DoorComponent/>}/>
            </Routes>
        </Router>
    )
}

export default MyRoute;