import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Center,
} from '@chakra-ui/react';

export default function VehicleRegistration() {
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
          <FormLabel>Vehiculo</FormLabel>
          <Input placeholder="Selecciona el vehiculo" />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Nombre del Motorista</FormLabel>
          <Input placeholder="Ingresa el nombre" />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Fecha</FormLabel>
          <InputGroup>
            <Input placeholder="Fecha de Entrada" />
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Hora</FormLabel>
          <InputGroup>
            <Input placeholder="Ingresa la Hora" />
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Kilometraje</FormLabel>
          <InputGroup>
            <Input placeholder="Ingresa el Kilometraje" />
          </InputGroup>
        </FormControl>

        <Button mt={6} colorScheme="blue" isFullWidth>
          Registrar Entrada
        </Button>
      </Box>
    </Center>
  );
}
