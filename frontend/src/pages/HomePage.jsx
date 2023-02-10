import { Box, Button, Center, Container, Heading, Input, InputGroup, InputRightElement, Stack, StackItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { LoginForm, SignUpForm } from '../components/Forms'

const Home = () => {

  return (
    <Center width={'100%'} height={"100vh"}>
      <VStack spacing={6}>
        <Heading fontWeight={"600"} fontSize={"3xl"} textAlign={'center'} borderBottom={"2px solid teal"}>iChat</Heading>
        <Box 
          px={"20px"}
          borderRadius={"12px"}
          width={350}
        >
          <Tabs variant='line' isFitted colorScheme='teal'>
            <TabList>
              <Tab>Login</Tab>
              <Tab>SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <SignUpForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Center>
  )
}

export default Home