import { Box, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFetchChats } from '../../hooks/useQuery'
import { useChatContext } from '../Context/ChatProvider'

const MyChats = () => {
  const {selectedChat, setSelectedChat, user, chats, setChats} = useChatContext()
  const [loggedUser, setLoggedUser] = useState(null)
  const toast = useToast();
  const {
    data,
    isLoading
  } = useFetchChats({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      toast({
          title: "Error!",
          description: "Failed to load chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"  
        })  
    }
  })


  return (
    <Box
      display={{base: selectedChat ? "none" : "flex", md: "flex"}}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      w={{base: "full", md: "30%"}}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      
    </Box>
  )
}

export default MyChats