import React, { useState, useEffect } from 'react';
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
  Alert,
  AlertIcon,
  Select,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

export default function ModalEditEntry({ entry, onEntryUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedEntry, setEditedEntry] = useState({
    nombre_motorista: entry.nombre_motorista,
    fecha: entry.fecha,
    hora: entry.hora,
    kilometraje: entry.kilometraje,
    placa: entry.placa,
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedEntry({
      ...editedEntry,
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
    const entryID = entry.id;
    axios
      .put(`http://localhost:4000/api/entradas/edit/${entryID}`, editedEntry)
      .then(response => {
        displayAlert('success', 'Entrada actualizada con éxito');
        setTimeout(() => {
          onClose();
          onEntryUpdated(entryID);
        }, 2000);
      })
      .catch(error => {
        displayAlert('error', 'Error al actualizar la entrada');
      });
  };

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

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setEditedEntry({
            nombre_motorista: entry.nombre_motorista,
            fecha: entry.fecha,
            hora: entry.hora,
            kilometraje: entry.kilometraje,
            placa: entry.placa,
          });
          hideAlert();
        }}
      >
        <FaEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Entrada</ModalHeader>
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
              <FormLabel>Placa del Vehículo</FormLabel>
              <Select
                placeholder="Seleccione placa"
                name="placa"
                required
                value={editedEntry.placa}
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

            <FormControl isRequired>
              <FormLabel>Nombre del Motorista</FormLabel>
              <Input
                placeholder="Nombre del motorista"
                name="nombre_motorista"
                required
                value={editedEntry.nombre_motorista}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Fecha</FormLabel>
              <Input
                name="fecha"
                required
                value={editedEntry.fecha}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Hora</FormLabel>
              <Input
                name="hora"
                required
                value={editedEntry.hora}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Kilometraje</FormLabel>
              <Input
                type="number"
                name="kilometraje"
                required
                value={editedEntry.kilometraje}
                onChange={handleInputChange}
              />
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
