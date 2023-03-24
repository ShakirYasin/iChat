import { ArrowBackIcon, ChatIcon, InfoOutlineIcon, SettingsIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Center, Flex, FormControl, IconButton, Input, Spinner, Text, Tooltip } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSendMessage } from '../../hooks/useMutation'
import { useFetchMessages } from '../../hooks/useQuery'
import { getSender } from '../config/chatLogics'
import { useChatContext } from '../Context/ChatProvider'
import ProfileModal from './modals/ProfileModal'
import UpdateGroupChatModal from './modals/UpdateGroupChatModal'

const SingleChat = () => {
    
    const {user, selectedChat, setSelectedChat} = useChatContext()
    const [newMessage, newMessageSet] = useState("")

    const {
        mutate: mutateSendMessage,
        isLoading
    } = useSendMessage({
        onSuccess: (data) => {
            newMessageSet("")
        }
    })

    const {
        data,
        isLoading: fetchingMessages,
    } = useFetchMessages({
        chatId: selectedChat?._id
    })

    const sendMessage = (e) => {
        if(e.key === "Enter" && newMessage) {
            mutateSendMessage({
                content: newMessage,
                chatId: selectedChat?._id
            })
        }
    }
    const typingHandler = (e) => {
        newMessageSet(e.target.value)

        // Typing Indicator Logic
    }

    
    useEffect(() => {
        console.log({selectedChat});
    }, [selectedChat])

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
        <Flex align={"center"} w={'full'} px={1} justify={{base: "space-between"}}>
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
                <>
                    <Text fontSize={"2xl"} textTransform={"capitalize"}>
                        {selectedChat?.chatName}
                    </Text>
                    <UpdateGroupChatModal>
                        <SettingsIcon boxSize={19} cursor={"pointer"} />
                    </UpdateGroupChatModal>
                </>
                }
        </Flex>
        <Flex
            w={"full"}
            h={"full"}
            bg={"gray.700"}
            rounded={"xl"}
            my={2}
            direction={"column"}
            justify={"space-between"}
            p={3}
        >
            {/* Messages */}
            {fetchingMessages ? (
                <Center>
                    <Spinner boxSize={22} />
                </Center>
            ) : (
                <Flex direction={"column"} gap={2}>
                    {data?.map((message) => (
                        <Badge key={message?._id} bg={user?._id === message?.sender?._id ? "teal" : "gray.600"} width={"max-content"} py={2} px={4} rounded={10} alignSelf={user?._id === message?.sender?._id ? "flex-end" : "flex-start"}>{message?.content}</Badge>
                    ))}
                </Flex>
            )}
            <Flex align={"center"} gap={2} mt={3}>
                <FormControl onKeyDown={sendMessage} isRequired>
                    <Input 
                        variant={"filled"} 
                        placeholder={"Enter a message"} 
                        value={newMessage}
                        onChange={typingHandler}
                    />
                </FormControl>
                <Tooltip label={"Send"} placement={"top"} hasArrow rounded={10}>
                    <Button isLoading={isLoading}>
                        <ChatIcon />
                    </Button>
                </Tooltip>
            </Flex>
        </Flex>
    </>
  )
}

export default SingleChat