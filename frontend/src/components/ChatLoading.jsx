import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = ({vertCount}) => {
  return (
    <Stack>
        {Array.from(Array(vertCount).keys()).map(item => (
            <Skeleton key={item} height={"25px"} />
        ))}
    </Stack>
  )
}

export default ChatLoading