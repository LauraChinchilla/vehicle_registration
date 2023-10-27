import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import axios from 'axios';
import ModalDeleteEntry from './ModalDeleteEntry';
// import ModalEditEntry from './ModalEditEntry,';
import { Button, Flex, Text } from '@chakra-ui/react';

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
  //   cell: row => <ModalEditEntry entry={row} />,
  // },
  {
    name: 'ELIMINAR',
    cell: row => <ModalDeleteEntry entrada={row} />,
  },
];

const CheckIn = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener la lista de entradas
    axios
      .get('http://localhost:4000/api/entradas/lista')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de entradas', error);
      });
  }, []);

  return (
    <Flex direction="column" padding={5}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" ml="6" fontWeight="bold">
          Lista de Entradas
        </Text>
        <Button
          onClick={() => {
            window.location.href = '/entry-list';
          }}
          colorScheme="teal"
          mr="6"
        >
          Registrar Entrada
        </Button>
      </Flex>
      <div className="custom-table">
        <DataTable columns={columns} data={entries} pagination />
      </div>
    </Flex>
  );
};

export default CheckIn;
