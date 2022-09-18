import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
function App(props) {
  // const { params } = props
  // const navigate = useNavigate()
  
  // useEffect(() => {
  //   if(params === 'register') {
  //     return <h1>HELLO {params}</h1>
  //   } else if (params === 'controller') {
  //     navigate('/liff-home')
  //   } else if (params === 'controller99-1'){
  //     navigate('/home2')
  //   }
  //   // eslint-disable-next-line
  // },[])
  return (
    <div className="App">
      <LiffComponents/>
    </div>
  );  
}

export default App;
