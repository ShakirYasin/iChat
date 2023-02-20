import {createContext, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";

const ChatContext = createContext(null);

const ChatProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('iChat_user')
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('iChat_user'))
        if(!userInfo) {
            navigate('/')
        }else {
            setUser(userInfo)
        }
    }, [])

    useEffect(() => {
        console.log({userInContext: user});
    }, [user])

    return <ChatContext.Provider value={{user, setUser, Logout}}>
        {children}
    </ChatContext.Provider>
}


export default ChatProvider

export const useChatContext = () => useContext(ChatContext)