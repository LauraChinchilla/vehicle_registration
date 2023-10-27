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
} from '@chakra-ui/react';

export default function EntryList({ onEntryAdded }) {
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

  const [vehicleOptions, setVehicleOptions] = useState([]); // Para almacenar las opciones de vehículos

  useEffect(() => {
    // Obtén la lista de vehículos desde tu API
    axios
      .get('http://localhost:4000/api/vehiculos/lista')
      .then(response => {
        const vehicles = response.data;
        // Mapea la lista de vehículos para obtener las opciones para el select
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
      // Enviar una solicitud POST a la API para registrar la entrada
      const response = await axios.post(
        'http://localhost:4000/api/entradas',
        formData
      );
      // Limpia el formulario después de enviar la entrada
      setFormData({
        placa: '',
        nombre_motorista: '',
        fecha: '',
        hora: '',
        kilometraje: '',
      });
      displayAlert('success', 'Entrada registrado con éxito.');
      console.log('Entrada registrada con éxito:', response.data);
    } catch (error) {
      // console.error('Error al registrar la entrada', error);
      displayAlert('error', 'No se pudo registrar la entrada.');
    }
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
      >
        <FormControl isRequired>
          <FormLabel>Vehículo</FormLabel>
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
              placeholder="Fecha de Entrada"
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

        <Button mt={6} colorScheme="blue" isFullWidth onClick={handleSubmit}>
          Registrar Entrada
        </Button>
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
