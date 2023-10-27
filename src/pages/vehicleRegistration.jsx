import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Link,
  HStack,
  Text, // Agregamos HStack para alinear elementos horizontalmente
} from '@chakra-ui/react';

export default function VehicleRegistration({ onVehicleAdded }) {
  const [newVehicle, setNewVehicle] = useState({
    marca: '',
    modelo: '',
    placa: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewVehicle({
      ...newVehicle,
      [name]: value,
    });
  };

  const hideAlert = () => {
    setShowAlert(false);
    setAlertContent('');
  };

  const displayAlert = (type, content, duration = 3000) => {
    setAlertType(type);
    setAlertContent(content);
    setShowAlert(true);

    setTimeout(hideAlert, duration);
  };

  const submitNewVehicle = async () => {
    if (!newVehicle.marca || !newVehicle.modelo || !newVehicle.placa) {
      displayAlert('error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/vehiculos/crear',
        newVehicle
      );
      onVehicleAdded(response.data);
      setNewVehicle({
        marca: '',
        modelo: '',
        placa: '',
      });
      displayAlert('success', 'Vehículo registrado con éxito.');
    } catch (error) {
      console.error('Error al registrar el vehículo', error);
      displayAlert('error', 'No se pudo registrar el vehículo.');
    }
  };

  return (
    <Center h="80vh">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        width="400px"
        bgColor="white"
        id="vehicle-registration"
      >
        <Text fontSize="xl" ml="6" fontWeight="bold">
          Registrar Vehiculo
        </Text>
        <FormControl isRequired>
          <FormLabel>Marca</FormLabel>
          <Input
            placeholder="Marca del vehículo"
            name="marca"
            value={newVehicle.marca}
            onChange={handleInputChange}
            required
            aria-invalid={!newVehicle.marca}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Modelo</FormLabel>
          <Input
            placeholder="Modelo del vehículo"
            name="modelo"
            value={newVehicle.modelo}
            onChange={handleInputChange}
            required
            aria-invalid={!newVehicle.modelo}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Placa</FormLabel>
          <InputGroup>
            <Input
              placeholder="Número de placa"
              name="placa"
              value={newVehicle.placa}
              onChange={handleInputChange}
              required
              aria-invalid={!newVehicle.placa}
            />
          </InputGroup>
        </FormControl>

        <Button
          mt={6}
          colorScheme="teal"
          isFullWidth
          onClick={submitNewVehicle}
        >
          Guardar
        </Button>

        <HStack justifyContent="flex-end" mt={5}>
          <Link
            mt={2}
            color="teal"
            textAlign="right"
            onClick={() => {
              window.location.href = '/vehicle-list';
            }}
          >
            Ver lista de Vehiculos
          </Link>
        </HStack>
      </Box>
      {showAlert && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="999"
        >
          <Alert status={alertType}>
            <AlertIcon />
            <AlertTitle mr={2}>{alertContent}</AlertTitle>
            <CloseButton onClick={hideAlert} />
          </Alert>
        </Box>
      )}
    </Center>
  );
}
