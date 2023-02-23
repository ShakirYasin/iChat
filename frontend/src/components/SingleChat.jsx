import { ArrowBackIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender } from '../config/chatLogics'
import { useChatContext } from '../Context/ChatProvider'
import ProfileModal from './modals/ProfileModal'

const SingleChat = () => {
    
    const {user, selectedChat, setSelectedChat} = useChatContext()

    if(!selectedChat) {
        return (
            <Center h={"full"} flexDir={"column"} gap={5}>
                <Text fontSize={"2xl"} color={"whiteAlpha.500"}>Click on a user to start Chatting</Text>
                <Text fontSize={"xl"} color={"whiteAlpha.500"}>or</Text>
                <Text fontSize={"xl"} color={"whiteAlpha.500"}>Press Ctrl+K to search user</Text>
            </Center>
        )
    }

  return (
    <>
        <Flex align={"center"} w={'full'} pb={3} px={1} justify={{base: "space-between"}}>
            <IconButton
                display={{base: "flex", md: "none"}}
                onClick={() => setSelectedChat(null)}
                icon={
                    <ArrowBackIcon />
                }
            />
                {!selectedChat.isGroup ? 
                    <>
                        <Text fontSize={"2xl"} textTransform={"capitalize"}>
                            {getSender(user, selectedChat?.users)?.name}
                        </Text>
                        <ProfileModal user={getSender(user, selectedChat?.users)}>
                            <InfoOutlineIcon boxSize={22} cursor={"pointer"} />
                        </ProfileModal>
                    </>
                :
                    <Text fontSize={"2xl"} textTransform={"capitalize"}>
                            {selectedChat?.chatName}
                    </Text>
                }
        </Flex>
        <Box
            w={"full"}
            h={"full"}
            bg={"gray.700"}
            rounded={"xl"}
        >

        </Box>
    </>
  )
}

export default SingleChat