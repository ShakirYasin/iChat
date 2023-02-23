import { CloseIcon } from '@chakra-ui/icons'
import { Badge, Box } from '@chakra-ui/react'
import React from 'react'

const UserBadge = ({user, handleFn}) => {
  return (
    <Box>
        <Badge colorScheme={'teal'} variant={"solid"} rounded={"full"} px={3} py={1}>
            {user?.name}
            <CloseIcon ml={3} boxSize={2.5} onClick={handleFn} cursor={"pointer"}/>
        </Badge>
    </Box>
  )
}

export default UserBadge