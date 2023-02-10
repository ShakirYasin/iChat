import { Button, useColorMode } from "@chakra-ui/react"


function App() {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Button m={6} onClick={toggleColorMode}>
      Color Mode: {colorMode}
    </Button>
  )
}

export default App
