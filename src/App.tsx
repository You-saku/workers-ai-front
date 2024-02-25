import { ChakraProvider } from '@chakra-ui/react'
import Chat from './pages/Chat';

function App() {
  return (
    <ChakraProvider>
      <Chat />
    </ChakraProvider>
  );
}

export default App;
