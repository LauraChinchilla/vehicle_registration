import React from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';

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

const data = [
  { marca: 'Toyota', modelo: 'Camry', placa: 'ABC123', id: 1 },
  { marca: 'Honda', modelo: 'Civic', placa: 'XYZ456', id: 2 },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: '13px',
      fontWeight: 'bold',
    },
  },
};

const VehicleList = () => {
  return (
    <div className="custom-table">
      <DataTable
        title="Lista de Vehiculos"
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default VehicleList;
