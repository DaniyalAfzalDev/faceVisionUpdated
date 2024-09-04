import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './department.css'; // Custom CSS for styling

const TableComponent = ({ data, setData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        departmentName: '',
        superior: '',
        employeeQty: '',
    });

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
                            <FaEdit className='table-edit' />
                        </button>
                        <button onClick={() => handleDelete(row.original)} style={{ background: 'none', border: 'none' }}>
                            <FaTrash className='table-delete' />
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
        pageOptions,
        gotoPage,
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
        setFormData({
            id: row.id,
            departmentName: row.departmentName,
            superior: row.superior,
            employeeQty: row.employeeQty,
        });
        setShowAddForm(false); // Hide Add Form
        setShowEditForm(true); // Show Edit Form
    };

    const handleDelete = (row) => {
        setData(prevData => prevData.filter(item => item.id !== row.id));
    };

    const handleAdd = () => {
        setFormData({ id: null, departmentName: '', superior: '', employeeQty: '' });
        setShowAddForm(true);
        setShowEditForm(false); // Hide Edit Form
    };

    const handleUpdate = () => {
        setShowAddForm(false);
        setShowEditForm(true);
        console.log(formData)
        setFormData({ id: null, departmentName: '', superior: '', employeeQty: '' }); // Reset form fields
    };
    const addDepartment = () => {
        setShowAddForm(false);
        setShowEditForm(true);
        console.log(formData)
        setFormData({ id: null, departmentName: '', superior: '', employeeQty: '' }); // Reset form fields
    };

    return (
        <div className='department-table'>
            <div className='table-header'>
                <form className="form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search" >
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" ></path>
                        </svg>
                    </button>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="input"
                        required type="text"
                    /><button className="reset" type="reset"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" ><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" ></path></svg></button></form>
                <button className="add-button" onClick={handleAdd}>
                    <FaPlus className="add-icon" /> Add New Department
                </button>
            </div>
            {showAddForm && !showEditForm && (
                <div className="add-department-form">
                    <h3>Add New Department</h3>
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={formData.departmentName}
                        onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Superior"
                        value={formData.superior}
                        onChange={(e) => setFormData({ ...formData, superior: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Employee Qty"
                        value={formData.employeeQty}
                        onChange={(e) => setFormData({ ...formData, employeeQty: e.target.value })}
                    />
                    <button className="submit-button" onClick={addDepartment}>
                        Add Department
                    </button>
                    <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </button>
                </div>
            )}
            {showEditForm && (
                <div className="add-department-form">
                    <h3>Edit Department</h3>
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={formData.departmentName}
                        onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Superior"
                        value={formData.superior}
                        onChange={(e) => setFormData({ ...formData, superior: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Employee Qty"
                        value={formData.employeeQty}
                        onChange={(e) => setFormData({ ...formData, employeeQty: e.target.value })}
                    />
                    <button className="submit-button" onClick={handleUpdate}>
                        Update Department
                    </button>
                    <button className="cancel-button" onClick={() => setShowEditForm(false)}>
                        Cancel
                    </button>
                </div>
            )}
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
