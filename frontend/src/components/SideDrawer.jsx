import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import useDebounce from "../../hooks/useDebounce"
import { useSearch } from '../../hooks/useQuery'
import ChatLoading from './ChatLoading'

const SideDrawer = ({onClose, isOpen}) => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)
    const [go, setGo] = useState(false)
    const toast  = useToast()

    const {data, isFetching} = useSearch(debouncedSearch, {
        enabled: go,
        onSuccess: () => {
            setGo(false)
        },
        onError: () => {
            setGo(false)
        },
    })
    
    const handleSearch = () => {
        if(!search) {
            toast({
                title: "Please Enter Something in Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })        
            return;
        }
        setGo(true)
    }

    return (
    <Drawer
        placement='left'
        onClose={onClose}
        isOpen={isOpen}
        size={"sm"}
    >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
            <DrawerBody>
                <Flex pb={'2'}>
                    <Input 
                        placeholder={'Search by name or email'}
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Go</Button>
                </Flex>
                {
                    isFetching ? 
                    <ChatLoading vertCount={10} />
                    :
                    <></>
                }
            </DrawerBody>
        </DrawerContent>
    </Drawer>
  )
}

export default SideDrawer