import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import axios from 'axios';
import ModalDeleteExit from './ModalDeleteExit';
// import ModalEditExit from './ModalEditExit';
import { Button, Flex, Text } from '@chakra-ui/react';
import eventBus from './eventBus';

const columns = [
  {
    name: 'VEHICULO',
    selector: 'placa',
    sortable: true,
  },
  {
    name: 'NOMBRE DEL MOTORISTA',
    selector: 'nombre_motorista',
    sortable: true,
  },
  {
    name: 'FECHA',
    selector: 'fecha',
    sortable: true,
  },
  {
    name: 'HORA',
    selector: 'hora',
    sortable: true,
  },
  {
    name: 'KILOMETRAJE',
    selector: 'kilometraje',
    sortable: true,
  },
  // {
  //   name: 'EDITAR',
  //   cell: row => <ModalEditExit exit={row} />,
  // },
  {
    name: 'ELIMINAR',
    cell: row => <ModalDeleteExit salida={row} />,
  },
];

const CheckOut = () => {
  const [exits, setExits] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener la lista de salidas
    axios
      .get('http://localhost:4000/api/salidas/lista')
      .then(response => {
        setExits(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de salidas', error);
      });
  }, []);

  useEffect(() => {
    const handleExitDeleted = deletedExitId => {
      const updatedExits = exits.filter(exit => exit.id !== deletedExitId);
      setExits(updatedExits);
    };

    eventBus.on('exitDeleted', handleExitDeleted);

    return () => {
      eventBus.off('exitDeleted', handleExitDeleted);
    };
  }, [exits]);

  return (
    <Flex direction="column" padding={5}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" ml="6" fontWeight="bold">
          Lista de Salidas
        </Text>
        <Button
          onClick={() => {
            window.location.href = '/departure-list';
          }}
          colorScheme="teal"
          mr="6"
        >
          Registrar Salida
        </Button>
      </Flex>
      <div className="custom-table">
        <DataTable
          columns={columns}
          data={exits}
          pagination
        />
      </div>
    </Flex>
  );
};

export default CheckOut;
