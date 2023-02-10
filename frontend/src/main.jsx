import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/900.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ChakraProvider} from "@chakra-ui/react"
import theme from './theme'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Chat from "./pages/ChatPage"
import Home from "./pages/HomePage"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/chat',
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
