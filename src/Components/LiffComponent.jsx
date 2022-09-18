import React from 'react'
import liff from '@line/liff'
import { useEffect, useState } from 'react'
import ProfileJPG from '../assets/profile.jpg'
import HomeComponents from './HomeComponents'
const LiffContext = React.createContext();
function LiffComponent() {
    const [linedata, setLineData] = useState({
        lineName: '',
        userId: '',
        pictureUrl: ProfileJPG,
        nickName: '',
        userStatus: 'wait'
    })

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
                        userStatus:'waitw'
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

    useEffect(()=> {
        liffLogin()
        // eslint-disable-next-line
    },[])

  return (
    <LiffContext.Provider value={{linedata, setLineData}}>
        <HomeComponents/>
    </LiffContext.Provider>
  )
}

export { LiffContext };
export default LiffComponent