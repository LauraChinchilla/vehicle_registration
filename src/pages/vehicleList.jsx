import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import axios from 'axios';
import ModalDeleteVehicle from './ModalDeleteVehicle';
import ModalEditVehicle from './ModalEditVehicle';
import { Flex, Button, Text } from '@chakra-ui/react';

const columns = [
  {
    name: 'MARCA',
    selector: 'marca',
    sortable: true,
  },
  {
    name: 'MODELO',
    selector: 'modelo',
    sortable: true,
  },
  {
    name: 'PLACA',
    selector: 'placa',
    sortable: true,
  },
  {
    name: 'EDITAR',
    cell: row => <ModalEditVehicle vehicle={row} />,
  },
  {
    name: 'ELIMINAR',
    cell: row => <ModalDeleteVehicle vehicle={row} />,
  },
];

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener la lista de vehículos
    axios
      .get('http://localhost:4000/api/vehiculos/lista')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de vehículos', error);
      });
  }, []);

  return (
    <Flex direction="column" padding={5}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" ml="6" fontWeight="bold">
          Lista de Vehiculos
        </Text>
        <Button
          onClick={() => {
            window.location.href = '/vehicle-registration';
          }}
          colorScheme="teal"
          mr="6"
        >
          Registrar Vehiculo
        </Button>
      </Flex>
      <div className="custom-table">
        <DataTable columns={columns} data={vehicles} pagination />
      </div>
    </Flex>
  );
};

export default VehicleList;
