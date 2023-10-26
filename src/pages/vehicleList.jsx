
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

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
    cell: row => (
      <Button>
        <div className="center-icons">
          <FaEdit />
        </div>
      </Button>
    ),
  },
  {
    name: 'ELIMINAR',
    cell: row => (
      <Button>
        <div className="center-icons">
          <FaTrash />
        </div>
      </Button>
    ),
  },
];

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener la lista de vehículos
    axios.get('http://localhost:4000/api/vehiculos')
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de vehículos', error);
      });
  }, []);



  return (
    <>
      <div className="custom-table">
        <DataTable
          title="Lista de Vehiculos"
          columns={columns}
          data={vehicles}
          pagination
        />
      </div>
    </>
  );
};

export default VehicleList;

