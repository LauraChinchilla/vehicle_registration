import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Home from './home';
import VehicleRegistration from './pages/vehicleRegistration';
import EntryList from './pages/entryList';
import DepartureList from './pages/DepartureList';
import VehicleList from './pages/vehicleList';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import Nav from './Navbar';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [vehicles, setVehicles] = useState([]); // Estado para la lista de vehículos

  // Función para agregar un vehículo a la lista
  const addVehicleToList = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

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
    <>
    <Nav />
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {currentPath === '/' && <Home />}
        {currentPath === '/vehicle-registration' && (
          <VehicleRegistration onVehicleAdded={addVehicleToList} /> // Pasa la función como prop
        )}
        {currentPath === '/vehicle-list' && <VehicleList vehicles={vehicles} />} 
        {currentPath === '/entry-list' && <EntryList />}
        {currentPath === '/checkIn' && <CheckIn />} 
        {currentPath === '/departure-list' && <DepartureList />}
        {currentPath === '/checkOut' && <CheckOut />} 

      </Box>
    </ChakraProvider>
    </>
  );
}

export default App;


