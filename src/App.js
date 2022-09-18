import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function App(props) {
  const { params } = props
  const navigate = useNavigate()
  
  useEffect(() => {
    if(params === 'register') {
      navigate('/register')
    } else if (params === 'controller') {
      navigate('/liff-home')
    } else if (params === 'controller99-1'){
      navigate('/home2')
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <div className='pt-6'>
      <h1 className='App-h1'>หน้าต่างควบคุม</h1>
      </div>
    </div>
  );  
}

export default App;
