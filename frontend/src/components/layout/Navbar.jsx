import React, { useState } from 'react'
import {Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure} from '@chakra-ui/react'
import {BellIcon, Search2Icon, ChevronDownIcon} from '@chakra-ui/icons'
import {useChatContext} from "../../Context/ChatProvider"
import ProfileModal from '../modals/ProfileModal'
import SideDrawer from '../SideDrawer'

const Navbar = () => {
  const {user, Logout} = useChatContext()
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Flex align={"center"} justify={"space-between"} p={"5px 10px"}>
        <Tooltip label="Search Users to Chat" hasArrow variant={""} placement='bottom'>
          <Button variant={"solid"} onClick={onOpen}>
            <Search2Icon />
            <Text display={{base: "none", md: "flex"}} px={"4"}>Search User</Text>
          </Button>
        </Tooltip>
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
      <SideDrawer onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default Navbar