import {createContext, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios'

const ChatContext = createContext(null);

const ChatProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [chats, setChats] = useState([])
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('iChat_user')
        setUser(null)
        navigate('/')
        setSelectedChat(null)
        setChats([])
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('iChat_user'))
        if(!userInfo) {
            navigate('/')
        }else {
            setUser(userInfo)
            axios.defaults.headers['Authorization'] = `Bearer ${userInfo?.token}`
            navigate('/chat')
        }
    }, [])  

    return <ChatContext.Provider value={{user, setUser, Logout, selectedChat, setSelectedChat, chats, setChats, notifications, setNotifications}}>
        {children}
    </ChatContext.Provider>
}


export default ChatProvider

export const useChatContext = () => useContext(ChatContext)