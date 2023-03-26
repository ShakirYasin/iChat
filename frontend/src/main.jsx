import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/900.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react"
import theme from './theme'
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Chat from "./pages/ChatPage"
import Home from "./pages/HomePage"
import {QueryClient, QueryClientProvider} from 'react-query'
import ChatProvider from "./Context/ChatProvider"

import "./index.css"

const queryClient = new QueryClient() 
const router = createBrowserRouter([
  {
    element: (
      <ChatProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}> 
            <Outlet/>
          </ChakraProvider>
        </QueryClientProvider>
      </ChatProvider>
    ),
    children: [
      {path: '/chat', element: <Chat />},
      {index: true, element: <Home /> },
    ]
  },
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
