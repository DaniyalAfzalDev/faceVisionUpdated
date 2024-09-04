import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './department.css';  // Custom CSS for styling

const TableComponent = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'S.No',
                accessor: 'serial', 
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Department Name',
                accessor: 'departmentName',
            },
            {
                Header: 'Superior',
                accessor: 'superior',
            },
            {
                Header: 'Employee Qty',
                accessor: 'employeeQty',
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => handleEdit(row.original)} style={{ background: 'none', border: 'none' }}>
                            <FaEdit style={{ color: 'green', fontSize: '20px' }}/>
                        </button>
                        <button onClick={() => handleDelete(row.original)} style={{ background: 'none', border: 'none' }}>
                            <FaTrash style={{ color: '#EB4A4A', fontSize: '20px' }}/>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const filteredData = useMemo(
        () =>
            data.filter(row =>
                Object.values(row).some(
                    val => String(val).toLowerCase().includes(searchQuery.toLowerCase())
                )
            ),
        [data, searchQuery]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setPageSize,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0 },
        },
        usePagination,
        useRowSelect
    );

    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };

    return (
        <div className='department-table'>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageOptions.length}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => gotoPage(selected)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default TableComponent;
