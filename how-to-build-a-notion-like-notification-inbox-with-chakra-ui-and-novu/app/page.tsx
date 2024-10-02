import { ChakraProvider } from '@chakra-ui/react'
import AppContainer from './components/layout/AppContainer';

export default function Home() {
  return (
    <ChakraProvider>
      <AppContainer />
    </ChakraProvider>
  );
}
