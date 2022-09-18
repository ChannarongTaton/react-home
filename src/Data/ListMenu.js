import { FaHome, FaUser, FaUserSecret } from "react-icons/fa";
const ListMenu = [
    {
        titile:"หน้าแรก",
        path:"/home-controller",
        icon: <FaHome/>
    },
    {
        titile:"สมาชิก",
        path:"/member",
        icon: <FaUser/>
    },
    {
        titile:"แอดมิน",
        path:"/admin",
        icon: <FaUserSecret/>
    }
]

export default ListMenu