import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Select,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';

export default function ExitList() {
  const [formData, setFormData] = useState({
    placa: '',
    nombre_motorista: '',
    fecha: '',
    hora: '',
    kilometraje: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertType, setAlertType] = useState('');

  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/vehiculos/lista')
      .then(response => {
        const vehicles = response.data;
        const options = vehicles.map(vehicle => ({
          value: vehicle.placa,
          label: vehicle.placa,
        }));
        setVehicleOptions(options);
      })
      .catch(error => {
        console.error('Error al obtener la lista de vehículos', error);
      });
  }, []);

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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.placa ||
      !formData.nombre_motorista ||
      !formData.fecha ||
      !formData.hora ||
      !formData.kilometraje
    ) {
      displayAlert('error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/salidas',
        formData
      );
      setFormData({
        placa: '',
        nombre_motorista: '',
        fecha: '',
        hora: '',
        kilometraje: '',
      });
      displayAlert('success', 'Salida registrada con éxito.');
      console.log('Salida registrada con éxito:', response.data);
    } catch (error) {
      displayAlert('error', 'No se pudo registrar la salida.');
    }
  };

  const handleCancel = () => {
    // Redirigir al inicio (home)
    window.location.href = '/';
  };

  return (
    <Center>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        width="400px"
        bgColor="white"
        mt={8}
        id="departure-list"
      >
        <Text fontSize="xl" ml="6" fontWeight="bold">
          Registrar Salida
        </Text>
        <FormControl isRequired>
          <FormLabel>Vehículo</FormLabel>
          <HStack justifyContent="space-between">
            <Select
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una placa</option>
              {vehicleOptions.map(vehicle => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </option>
              ))}
            </Select>
            <Button
              onClick={() => {
                window.location.href = '/vehicle-registration';
              }}
              colorScheme="teal"
              mr="6"
            >
              Registrar
            </Button>
          </HStack>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Nombre del Motorista</FormLabel>
          <Input
            name="nombre_motorista"
            value={formData.nombre_motorista}
            onChange={handleInputChange}
            placeholder="Ingresa el nombre"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Fecha</FormLabel>
          <InputGroup>
            <Input
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              placeholder="Fecha de Salida"
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Hora</FormLabel>
          <InputGroup>
            <Input
              name="hora"
              value={formData.hora}
              onChange={handleInputChange}
              placeholder="Ingresa la Hora"
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Kilometraje</FormLabel>
          <InputGroup>
            <Input
              name="kilometraje"
              value={formData.kilometraje}
              onChange={handleInputChange}
              placeholder="Ingresa el Kilometraje"
            />
          </InputGroup>
        </FormControl>

        <HStack justifyContent="space-between" mt={6}>
          <Button onClick={handleCancel}>Cancelar</Button>

          <Button colorScheme="teal" isFullWidth onClick={handleSubmit}>
            Guardar
          </Button>
        </HStack>
        <HStack justifyContent="flex-end" mt={5}>
          <Link
            mt={2}
            color="teal"
            textAlign="right"
            onClick={() => {
              window.location.href = '/checkOut';
            }}
          >
            Ver lista de Salidas
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
