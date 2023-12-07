import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './List.scss';

const EmployeeTable = () => {
    const [gridApi, setGridApi] = useState(null);
    // eslint-disable-next-line
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [rowData, setRowData] = useState([]);
    const [noResults, setNoResults] = useState(false);


    useEffect(() => {
        async function getData() {
            const response = await (await fetch('http://localhost:4200/get')).json()
            setRowData(response.data);
        }
       getData();
    }, []);

    const columnDefs = [
        { headerName: "firstName", field: "firstName", sortable: true},
        { headerName: "lastName", field: "lastName", sortable: true},
        { headerName: "departureDate", field: "departureDate", sortable: true },
        { headerName: "department", field: "department", sortable: true },
        { headerName: "birthDate", field: "birthDate", sortable: true },
        { headerName: "address", field: "address", sortable: true },
        { headerName: "city", field: "city", sortable: true },
        { headerName: "states", field: "states", sortable: true},
        { headerName: "Zip code", field: "postalCode", sortable: true },
    ];



    const onGridReady = params => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const updateSearch = () => {
        gridApi.setQuickFilter(searchValue);
        const rowCount = gridApi.getModel().getRowCount();
        setNoResults(rowCount === 0);
    };

    if(gridApi) {
        gridApi.sizeColumnsToFit();
    }

    const gridOptions = {
        domLayout: 'autoHeight',
        icons: {
            sortAscending: '<span>▲</span>',
            sortDescending: '<span>▼</span>',
            first: '<span>◀◀</span>',
            previous: '<span>◀</span>',
            next: '<span>▶</span>',
            last: '<span>▶▶</span>',
        },
    };

    return (
        <div className="listContainer">
            <section className="top">
                <h1>List of employees</h1>
                <div style={{ marginBottom: '10px' }}>
                   <p> Search:</p>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onInput={updateSearch}
                    />
                </div>
                <div>
                    <p> Show:</p>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </section>
            <div className="ag-theme-alpine" style={{ height:"68vh", width: '100%' }}>

                <AgGridReact
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={pageSize}
                    onGridReady={onGridReady}/>

                {noResults && <div className="ErrorMessage">aucun résultat</div>}
            </div>
        </div>
    );
};


export default EmployeeTable;
