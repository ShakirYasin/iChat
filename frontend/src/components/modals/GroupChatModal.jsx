import { Box, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useChatContext } from '../../Context/ChatProvider';

const GroupChatModal = ({children}) => {

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const toast = useToast()
  const { user, chats, setChats } = useChatContext();

  return (
    <>
      <Box as='span' onClick={onOpen} p={0}>{children}</Box>
      <Modal size={"lg"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontSize={"2xl"}
          ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection={"column"} h={"100%"}>
                {/* <Image 
                    borderRadius={"full"}
                    boxSize={"150"}
                    src={user?.picture}
                    alt={user?.name}
                /> */}
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal