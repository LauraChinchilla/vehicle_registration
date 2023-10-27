import React, { useState } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  FormLabel,
  ModalFooter,
  FormControl,
  Input,
  InputGroup,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import eventBus from './eventBus'; 

export default function ModalEditVehicle({ vehicle, onVehicleUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedVehicle, setEditedVehicle] = useState({
    marca: vehicle.marca,
    modelo: vehicle.modelo,
    placa: vehicle.placa,
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedVehicle({
      ...editedVehicle,
      [name]: value,
    });
  };

  const hideAlert = () => {
    setAlert({ type: '', message: '' });
  };

  const displayAlert = (type, message, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(hideAlert, duration);
  };

  const handleUpdate = () => {
    const vehicleID = vehicle.id;
    axios
      .put(
        `http://localhost:4000/api/vehiculos/edit/${vehicleID}`,
        editedVehicle
      )
      .then(response => {
        displayAlert('success', 'Vehículo actualizado con éxito');
        setTimeout(() => {
          onClose();
          eventBus.emit('vehicleUpdated', vehicleID, editedVehicle); // Emitir el evento
        }, 2000); // Cerrar el modal después de 2 segundos
      })
      .catch(error => {
        displayAlert('error', 'Error al actualizar el vehículo');
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setEditedVehicle({
            marca: vehicle.marca,
            modelo: vehicle.modelo,
            placa: vehicle.placa,
          });
          hideAlert();
        }}
      >
        <FaEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Vehículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {alert.type === 'success' && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
            {alert.type === 'error' && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {alert.message}
              </Alert>
            )}

            <FormControl isRequired>
              <FormLabel>Marca</FormLabel>
              <Input
                placeholder="Marca del vehículo"
                name="marca"
                required
                value={editedVehicle.marca}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Modelo</FormLabel>
              <Input
                placeholder="Modelo del vehículo"
                name="modelo"
                required
                value={editedVehicle.modelo}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Placa</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Número de placa"
                  name="placa"
                  required
                  value={editedVehicle.placa}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
