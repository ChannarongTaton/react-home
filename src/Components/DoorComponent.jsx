import React, { useState, useEffect } from 'react'
import style from '../css/Door.module.css';
// import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import liff from '@line/liff'
import ProfileJPG  from '../assets/profile.jpg'
function DoorComponent() {
// eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  const [statein, setStateIn] = useState([])
  const [linedata, setLineData] = useState({
    nickName: '',
    lineName: '',
    userId: '',
    pictureUrl: ProfileJPG,
    userStatus:''
})
// eslint-disable-next-line
  const {nickName, lineName, userId, pictureUrl, userStatus} = linedata
  // eslint-disable-next-line
  const liffLogin = async () => {
    await liff.init({liffId: process.env.REACT_APP_LIFFID})
    .catch(err => console.log(err))
    liff.ready.then(() => {
        if(!liff.isLoggedIn()){
            liff.login()
        }
        liff.getProfile().then(profile => {
            let {displayName, userId, pictureUrl} = profile
            if (pictureUrl === '') {
                setLineData({
                    lineName: displayName,
                    userId: userId,
                    pictureUrl: ProfileJPG,
                    nickName: '',
                    userStatus:'99'
                })
            } else {
                setLineData({
                    lineName: displayName,
                    userId: userId,
                    pictureUrl: pictureUrl,
                    nickName: '',
                    userStatus:'99'
                })
            }
        })
    })

    const isFriend = await getFriend();
    if(!isFriend) {
        window.location = 'https://lin.ee/M9Ya7UI'
    }
}

async function getFriend() {
    const friend = await liff.getFriendship()
    return friend.friendFlag
}

  const fetchData=()=> {
    axios.get(`${process.env.REACT_APP_API}/Item/${3}`)
    .then(response => {
      setStateIn(response.data)
      console.log(response.data);
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
    // liffLogin()
  },[])

  return (
    <div className={style.settingDoorCom}>
      <div className={style.DoorCom}>
        <button onClick={()=>trickBtn(statein.id, statein.isActive, lineName)} className={style.button}>เปิด/ปิด ประตูกดปุ่มนี้</button>
      </div> 
        <p>*กดปุ่มเดียว*</p>
    </div>
  )
}

export default DoorComponent