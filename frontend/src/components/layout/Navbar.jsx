import React, { useEffect, useState } from 'react'
import {Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure} from '@chakra-ui/react'
import {BellIcon, Search2Icon, ChevronDownIcon} from '@chakra-ui/icons'
import {useChatContext} from "../../Context/ChatProvider"
import ProfileModal from '../modals/ProfileModal'
import SideDrawer from '../SideDrawer'
import SearchModal from '../modals/SearchModal'

const Navbar = () => {
  const {user, Logout} = useChatContext()
  const {isOpen, onOpen, onClose} = useDisclosure()
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        onOpen()
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }

  }, [])
  return (
    <>
      <Flex align={"center"} justify={"space-between"} p={"5px 10px"}>
        <SearchModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <Tooltip label="Search Users to Chat" hasArrow variant={""} placement='bottom'>
            <Button variant={"solid"}>
              <Search2Icon />
              <Text display={{base: "none", md: "flex"}} px={"4"}>Search User</Text>
              <Text fontSize={"12px"} opacity={0.5} ml={5}>Ctrl + K</Text>
            </Button>
          </Tooltip>
        </SearchModal>
        <Text fontSize={"2xl"} color={"teal.300"}>iChat</Text>
        <Box>
          <Menu>
            <MenuButton p={"1"}>
              <BellIcon fontSize={"2xl"} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar 
                size={'sm'}
                cursor={"pointer"}
                name={user?.name}
                bg={"teal.300"}
                fontWeight={"600"}
                src={user?.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider /> 
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  )
}

export default Navbar