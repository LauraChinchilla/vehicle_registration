import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import axios from 'axios';
import ModalDeleteExit from './ModalDeleteExit';

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

  return (
    <>
      <div className="custom-table">
        <DataTable
          title="Lista de Salidas"
          columns={columns}
          data={exits}
          pagination
        />
      </div>
    </>
  );
};

export default CheckOut;
