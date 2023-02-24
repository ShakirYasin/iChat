import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender } from '../../config/chatLogics'
import { useChatContext } from '../../Context/ChatProvider'

const UserChatItem = ({chat, handleFn}) => {
    
    const {user, selectedChat} = useChatContext()

  return (
    <Flex
        align={"center"}
        overflow={'hidden'}
        gap={4}
        onClick={handleFn}
        mt={"0!important"}
        cursor={"pointer"}
        bg={selectedChat?._id === chat?._id ? "whiteAlpha.200" : "transparent"}
        borderBottomWidth={selectedChat?._id === chat?._id  ? 1 : 0}
        borderBottomColor={selectedChat?._id === chat?._id ? "teal.800" : "whiteAlpha.300"}
        borderRightWidth={selectedChat?._id === chat?._id ? 6 : 0}
        borderRightColor={selectedChat?._id === chat?._id ? "teal" : "whiteAlpha.300"}
        color={"white"}
        px={3}
        py={3}
        key={chat._id}
        >
            <Image 
                src={chat?.isGroup ? chat?.groupImage : getSender(user, chat.users)?.picture}
                width={55}
                height={55}
                rounded={"full"}
                borderWidth={3}
                borderColor={selectedChat?._id === chat?._id ? "teal.500" : "whiteAlpha.300"}
                borderStyle={"solid"}
            />
            <Box>
                <Text ml={selectedChat?._id === chat?._id ? 6 : 0} transition={"margin 0.15s ease-in-out"} color={selectedChat?._id === chat?._id ? "teal.300" : ""} >
                    {!chat.isGroup ? (
                    getSender(user, chat.users)?.name
                    ) : ( chat.chatName )}
                </Text>
            </Box>
    </Flex>
  )
}

export default UserChatItem