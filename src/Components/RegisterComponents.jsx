import React, { useState, useEffect, } from 'react'
import ProfileJPG from '../assets/profile.jpg'
import '../css/Register.css'
import liff from '@line/liff/dist/lib'
import axios from 'axios'

function RegisterComponents() {
  const [linedata, setLineData] = useState({
    nickName: '',
    lineName: '',
    userId: '',
    pictureUrl: ProfileJPG,
    userStatus:''
})

  const {nickName, lineName, userId, pictureUrl, userStatus} = linedata
  const liffLogin= async () => {
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
                    userStatus:'wait'
                })
            } else {
                setLineData({
                    lineName: displayName,
                    userId: userId,
                    pictureUrl: pictureUrl,
                    nickName: '',
                    userStatus:'wait'
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

const inputValue=name=>e=> {
  setLineData({...linedata,[name]:e.target.value})
}

const sendData = (e) => {
  e.preventDefault()
  axios.post(`${process.env.REACT_APP_API_USER}/create`,
  { nickName, lineName, userId, pictureUrl, userStatus})
  .then(response => {
    if (response.status === 200) {
      liff.closeWindow()
    }
  })
}

useEffect(()=> {
  liffLogin()
  // eslint-disable-next-line
},[])
  return (
    <div>
      <div className='container'>
        <h1 style={{"margin-top": '100px', "margin-bottom": '30px'}}>ใส่ชื่อเล่น</h1>
        <form className='form' onSubmit={sendData}>
          <div className='form-control'>
            <label>ชื่อเล่น</label>
            <input type="text" value={nickName} onChange={inputValue('nickName')} required/>
          </div>
          <button type='submit'>เข้าใช้งาน</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterComponents