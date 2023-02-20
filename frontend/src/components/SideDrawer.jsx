import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const SideDrawer = ({onClose, isOpen}) => {
    const [search, setSearch] = useState('')

    const handleSearch = () => {

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
            </DrawerBody>
        </DrawerContent>
    </Drawer>
  )
}

export default SideDrawer