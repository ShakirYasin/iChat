import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFetchChats } from '../../hooks/useQuery'
import { getSender } from '../config/chatLogics'
import { useChatContext } from '../Context/ChatProvider'
import ChatLoading from './ChatLoading'
import GroupChatModal from './modals/GroupChatModal'


const MyChats = () => {
  const {selectedChat, setSelectedChat, user, chats, setChats} = useChatContext()
  const [loggedUser, setLoggedUser] = useState(null)
  const toast = useToast();
  const {
    isLoading
  } = useFetchChats({
    onSuccess: (data) => {
      console.log(data);
      setChats(data)
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
      p={3}
      w={{base: "full", md: "30%", xl: "25%", "2xl": "17%"}}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Flex
        columnGap={3}
        pb={3}
        px={3}
      >
        <Text
          w={"full"}
          fontSize={{base: "28px", md: '30px'}}
        >
          My Chats
        </Text>
        <Menu>
          <MenuButton as={Button}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList
            py={0}
            >
                <MenuItem
                  icon={<AddIcon />}
                  >
                  <GroupChatModal>
                    <Button bg={"transparent"} p={0} _hover={{bg: "transparent"}}>
                      New Group Chat
                    </Button>
                  </GroupChatModal>
                </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        direction={"column"}
        p={3}
        w={"full"}
        h={"full"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"auto"}>
              {chats.map(chat => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "teal" : "whiteAlpha.200"}
                  borderColor={selectedChat === chat ? "transparent" : "teal.700"}
                  borderWidth={1}
                  color={"white"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroup ? (
                      getSender(user, chat.users)
                    ) : ( chat.chatName )}
                  </Text>
                </Box>
              ))}
          </Stack>
        ): (
          <ChatLoading /> 
        )}
      </Flex>
    </Box>
  )
}

export default MyChats