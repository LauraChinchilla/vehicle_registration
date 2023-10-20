import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Nav from './Navbar';
import Home from './home';
import VehicleRegistration from './pages/vehicleRegistration';
import EntryList from './pages/entryList';
import DepartureList from './pages/DepartureList';
import VehicleList from './pages/vehicleList';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuchar cambios en la URL
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      // Detener la escucha al desmontar el componente
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Nav />
        {currentPath === '/' && <Home />}
        {currentPath === '/vehicle-registration' && <VehicleRegistration />}
        {currentPath === '/entry-list' && <EntryList />}
        {currentPath === '/departure-list' && <DepartureList />}
        {currentPath === '/vehicle-list' && <VehicleList />}
      </Box>
    </ChakraProvider>
  );
}

export default App;




// import React from 'react';
// import {
//   ChakraProvider,
//   Box,
//   theme,
// } from '@chakra-ui/react';
// import Nav from './Navbar';
// import Home from './home';
// import vehicleRegistration from './pages/vehicleRegistration';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// function App() {
//   return (
//     <ChakraProvider theme={theme}>
//       <Box textAlign="center" fontSize="xl">
//        <Nav/>
//        <Router>
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/vehicle-registration" component={vehicleRegistration} />
//           </Switch>
//         </Router>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default App;
