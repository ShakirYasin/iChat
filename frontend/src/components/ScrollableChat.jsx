import { Badge } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { useChatContext } from '../Context/ChatProvider'

const ScrollableChat = ({messages}) => {
    const {user} = useChatContext()
    return (
    <ScrollableFeed className='scrollable-chat'>
        {messages?.length > 0 && messages?.map((message, i) => (
            <Badge key={message?._id} display={"flex"} bg={user?._id === message?.sender?._id ? "teal" : "gray.600"} width={"max-content"} py={2} px={4} my={2} rounded={10} ml={user?._id === message?.sender?._id ? "auto" : "0"}>{message?.content}</Badge>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat