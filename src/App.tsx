import { ChakraProvider } from '@chakra-ui/react'
import ChatPage from './components/ChatPage';

function App() {
  return (
    <ChakraProvider>
      <ChatPage />
    </ChakraProvider>
  );
}

export default App;
