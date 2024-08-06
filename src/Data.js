import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import useFetchData from './useFetchData';
import './Data.css';

const Data = () => {
  const { data, loading, error } = useFetchData();
  const gridApi = useRef(null);

  const columnDefs = [
    {
      headerName: 'Avatar',
      field: 'avatar_url',
      cellRenderer: params => (
        <Link to={`/user/${params.data.id}`}>
          <img src={params.value} alt="Avatar" className="avatar-image" />
        </Link>
      )
    },
    { headerName: 'Login', field: 'login' },
    { headerName: 'ID', field: 'id' },
    { headerName: 'Node ID', field: 'node_id' },
    {
      headerName: 'Followers Count',
      field: 'followers_count',
      cellStyle: params => ({
        textAlign: 'right',
        backgroundColor: params.value < 20 ? '#f8d7da' : '#d4edda',
        color: params.value < 20 ? '#721c24' : '#155724',
        fontWeight: 'bold'
      })
    },
    {
      headerName: 'Following Count',
      field: 'following_count',
      cellStyle: params => ({
        textAlign: 'right',
        backgroundColor: params.value < 20 ? '#f8d7da' : '#d4edda',
        color: params.value < 20 ? '#721c24' : '#155724',
        fontWeight: 'bold'
      })
    },
    { headerName: 'Gists Count', field: 'gists_count', cellStyle: { textAlign: 'right' } },
    { headerName: 'Starred Count', field: 'starred_count', cellStyle: { textAlign: 'right' } }
  ];

  const onGridReady = params => {
    gridApi.current = params.api;
  };

  const exportToCSV = () => {
    if (gridApi.current) {
      gridApi.current.exportDataAsCsv({
        allColumns: true,
        fileName: 'github-users.csv'
      });
    }
  };

  return (
    <div className="data-container">
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{`Error: ${error}`}</p>}

      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
        />
      </div>
      <button
        onClick={exportToCSV}
        className="export-button"
        disabled={loading}
        aria-label="Export to CSV"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default Data;
