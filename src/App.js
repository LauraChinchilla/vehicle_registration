import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Nav from './Navbar';
import Home from './home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
       <Nav/>
       <Home/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
