import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const MyAgGrid = ({ rowData, columnDefs }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true, sortable: true, filter: true }}
      />
    </div>
  );
};

export default MyAgGrid;
