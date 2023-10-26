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

export default function ModalDeleteVehicle({ vehicle, onVehicleDeleted }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleDelete = () => {
    // Depura la URL antes de realizar la solicitud DELETE
    const vehicleID = vehicle.id;
    const deleteURL = `http://localhost:4000/api/vehiculos/delete/${vehicleID}`;

    // Realizar la solicitud DELETE al servidor
    axios
      .delete(deleteURL)
      .then(response => {
        displayAlert('success', 'Vehículo eliminado con éxito');
        setTimeout(() => {
          onClose(); // Cerrar el modal después de eliminar
        }, 2000); // Cerrar el modal después de 2 segundos
      })
      .catch(error => {
        displayAlert('error', 'Error al eliminar el vehículo');
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
          <ModalHeader>Eliminar Vehículo</ModalHeader>
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

            <FormLabel>¿Deseas eliminar el vehículo?</FormLabel>
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




// import React from 'react';
// import {
//   Button,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalBody,
//   ModalContent,
//   ModalCloseButton,
//   ModalHeader,
//   FormLabel,
//   ModalFooter,
// } from '@chakra-ui/react';
// import { FaTrash } from 'react-icons/fa';
// import axios from 'axios';

// export default function ModalDeleteVehicle({ vehicle }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleDelete = () => {
//     // Depura la URL antes de realizar la solicitud DELETE
//     const vehicleID = vehicle.id;
//     const deleteURL = `http://localhost:4000/api/vehiculos/delete/${vehicleID}`;

//     // Realizar la solicitud DELETE al servidor
//     axios
//       .delete(deleteURL)
//       .then(response => {
//         console.log(response.data);
//         onClose(); // Cerrar el modal después de eliminar
//         // También puedes recargar la lista de vehículos aquí
//       })
//       .catch(error => {
//         console.error('Error al eliminar el vehículo', error);
//         // Manejar el error
//       });
//   };

//   return (
//     <>
//       <Button onClick={onOpen}>
//         <FaTrash />
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Eliminar Vehículo</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormLabel>¿Deseas eliminar el vehículo?</FormLabel>
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={onClose} mr={3}>
//               Cancelar
//             </Button>
//             <Button colorScheme="blue" onClick={handleDelete}>
//               Confirmar
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

