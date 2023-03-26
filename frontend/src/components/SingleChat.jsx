import { ArrowBackIcon, ChatIcon, InfoOutlineIcon, SettingsIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Center, Flex, FormControl, IconButton, Input, Spinner, Text, Tooltip } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSendMessage } from '../../hooks/useMutation'
import { useFetchMessages } from '../../hooks/useQuery'
import { getSender } from '../config/chatLogics'
import { useChatContext } from '../Context/ChatProvider'
import ProfileModal from './modals/ProfileModal'
import UpdateGroupChatModal from './modals/UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import useSocket from "../../hooks/useSocket"
import animationData from "../animations/typing-indicator.json"
import Lottie from "react-lottie"
import useDebounce from '../../hooks/useDebounce'

const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

const SingleChat = () => {
    
    const {user, selectedChat, setSelectedChat} = useChatContext()
    const [newMessage, newMessageSet] = useState("")
    const socket = useSocket()
    const [socketConnected, setSocketConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [guestTyping, setGuestTyping] = useState(false)
    const [meTyping, setMeTyping] = useState(false)
    const debouncedTyping = useDebounce(newMessage, 3000)
    // var selectedChatCompare;

    const {
        mutate: mutateSendMessage,
        isLoading
    } = useSendMessage({
        onSuccess: (data) => {
            newMessageSet("")
            setMessages([...messages, data])
            socket.emit("new message", data)
        }
    })

    const {
        isLoading: fetchingMessages,
    } = useFetchMessages({
        chatId: selectedChat?._id
    }, {
        onSuccess: (data) => {
            setMessages(data)
            socket.emit("join chat", selectedChat?._id)
        }
    })

    const sendMessage = (e) => {
        if(e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat?._id)
            mutateSendMessage({
                content: newMessage,
                chatId: selectedChat?._id
            })
        }
    }
    const typingHandler = (e) => {
        newMessageSet(e.target.value)
        // Typing Indicator Logic

        if(!socketConnected) return
        
        if(!guestTyping) {
            setMeTyping(true)
            socket.emit("typing", selectedChat?._id)
        }
    }

    useEffect(() => {
        if(!meTyping) return

        if(debouncedTyping && meTyping) {
            socket.emit("stop typing", selectedChat?._id)
            setMeTyping(false)    
        }
    }, [meTyping, debouncedTyping])

    useEffect(() => {
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setGuestTyping(true))
        socket.on("stop typing", () => setGuestTyping(false))
    }, [socket])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if(selectedChat?._id !== newMessageRecieved.chat._id) {
                // give notification

            }
            else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

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
            h={"80vh"}
            bg={"gray.700"}
            rounded={"xl"}
            my={2}
            direction={"column"}
            justify={"space-between"}
            p={3}
            // maxHeight={"100%"}
        >
            {/* Messages */}
            {fetchingMessages ? (
                <Center w={"full"} h={"full"}>
                    <Spinner boxSize={22} />
                </Center>
            ) : (
                <Flex direction={"column"} gap={2} overflow={"hidden"}>
                    <ScrollableChat messages={messages} />
                </Flex>
            )}
            <Flex align={"flex-end"} gap={2} mt={3}>
                <FormControl onKeyDown={sendMessage} isRequired>
                    {guestTyping ? <Box>
                        <Lottie 
                            options={defaultOptions}
                            width={50}
                            height={25}
                            style={{marginBottom: 15, marginLeft: 0}}
                        />
                    </Box> 
                    : <></>}
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