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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import eventBus from './eventBus';

export default function ModalDeleteVehicle({ salida }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleDelete = () => {
    // Depura la URL antes de realizar la solicitud DELETE
    const salidaID = salida.id;
    const deleteURL = `http://localhost:4000/api/salidas/delete/${salidaID}`;

    // Realizar la solicitud DELETE al servidor
    axios
      .delete(deleteURL)
      .then(response => {
        displayAlert('success', 'Salida eliminada con éxito');
        setTimeout(() => {
          onClose(); // Cerrar el modal después de eliminar
          eventBus.emit('exitDeleted', salida.id);
        }, 2000); // Cerrar el modal después de 2 segundos
      })
      .catch(error => {
        displayAlert('error', 'Error al eliminar la salida');
      });
  };

  const hideAlert = () => {
    setAlert({ type: '', message: '' });
  };

  const displayAlert = (type, message, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(hideAlert, duration);
  };

  return (
    <>
      <Button onClick={onOpen}>
        <FaTrash />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Salida</ModalHeader>
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

            <FormLabel>¿Deseas eliminar la Salida?</FormLabel>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleDelete}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
