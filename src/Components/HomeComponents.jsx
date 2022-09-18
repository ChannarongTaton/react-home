import '../css/Home.css'
import {BsLightbulb, BsLightbulbOffFill} from 'react-icons/bs'
import { useState, useEffect}from 'react'
import axios from 'axios'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { LiffContext } from './LiffComponent'
import { useContext } from 'react'




function HomeComponents() {
  // eslint-disable-next-line
  const {linedata, setState} = useContext(LiffContext);

  // eslint-disable-next-line
  const {lineName, userId, pictureUrl} = linedata //ดึงค่าจาก LiffComponents มาจาก useContext
  const [statein, setStateIn] = useState([])  //ดึงข้อมูลจาก api อุปกรณ์มาเก็บไว้เป็น list 0 1 2
  const [loading, setLoading] = useState(false) // Icon loading เมื่อกดจะให้แสดง แล้วเมื่อโหลดเสร็จให้ปิด
  const fetchData=()=> {
    axios.get(`${process.env.REACT_APP_API}/Items`)
    .then(response => {
      setStateIn(response.data)
    })
    .catch(err => console.log(err))
    
  }

  const trickBtn=(id, active, lineName)=> {
    setLoading(true)
    axios
    .put(`${process.env.REACT_APP_API}/Change-state/${id}`,{active, lineName})
    .then(response => {
      console.log(response.data.isActive);
      if (response.status === 200) {
        setTimeout(() => {
          fetchData()
          setLoading(false)
        }, 500);
      } else {
        setLoading(true)
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  },[])

  return(
      <div className='HomeDiv'>
        <div>
        {loading === false ? statein.map((home, index) => (
          <div key={index} className='HomeCom'>
              <h1>{home.name}</h1>
              <div onClick={()=>trickBtn(home.id, home.isActive, lineName)} className='button-css'>
                {loading === false ? (home.isActive === true ? <BsLightbulb className='Icons'/> : <BsLightbulbOffFill className='Icons'/>) : <RotatingLines/>}
              </div>
              <h5>{home.isActive === true ? 'สถานะ : ปิด' : 'สถานะ : เปิด'}</h5>
              <h5>{"สั่งทำงานโดย : " + home.userActive}</h5>
          </div>
        )) : <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#454A55" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />}
        </div>
      </div>
  )
}

export default HomeComponents