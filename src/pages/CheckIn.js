import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './VehicleList.css';
import axios from 'axios';

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
    <>
      <div className="custom-table">
        <DataTable
          title="Lista de Entradas"
          columns={columns}
          data={entries}
          pagination
        />
      </div>
    </>
  );
};

export default CheckIn;
