import React from 'react';
import { Box, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Button, Center } from '@chakra-ui/react';

export default function VehicleRegistration() {
  return (
    <Center h="80vh">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        width="400px"
        bgColor="white"
      >
        <FormControl isRequired>
          <FormLabel>Marca</FormLabel>
          <Input placeholder="Marca del vehículo" />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Modelo</FormLabel>
          <Input placeholder="Modelo del vehículo" />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Placa</FormLabel>
          <InputGroup>
            <InputLeftAddon children="Placa" />
            <Input placeholder="Número de placa" />
          </InputGroup>
        </FormControl>

        <Button
          mt={6}
          colorScheme="blue"
          isFullWidth
        >
          Registrar Vehículo
        </Button>
      </Box>
    </Center>
  );
}
