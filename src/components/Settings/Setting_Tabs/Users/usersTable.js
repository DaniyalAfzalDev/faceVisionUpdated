import React, { useState, useMemo, useCallback } from 'react';
import { useTable, usePagination } from 'react-table';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './users.css'; // Custom CSS for styling

const UserTable = ({ data, setData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        username: '',
        email: '',
        password: '',
        authorization: 'User',
    });

    const handleAuthorizationToggle = useCallback(() => {
        setFormData(prevState => ({
            ...prevState,
            authorization: prevState.authorization === 'Admin' ? 'User' : 'Admin',
        }));
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Password',
            accessor: 'password',
        },
        {
            Header: 'Authorization',
            accessor: 'authorization',
            Cell: ({ value }) => (
                <span className={`auth ${value === 'Admin' ? 'adminAuth' : 'userAuth'}`}>
                    {value}
                </span>
            ),
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
    ], []);

    const filteredData = useMemo(() =>
        data.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        ), [data, searchQuery]
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
        usePagination
    );

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            username: row.username,
            email: row.email,
            password: row.password,
            authorization: row.authorization,
        });
        setShowAddForm(false);
        setShowEditForm(true);
    };

    const handleDelete = (row) => {
        setData(prevData => prevData.filter(item => item.id !== row.id));
    };

    const handleAdd = () => {
        setFormData({ id: null, username: '', email: '', password: '', authorization: 'User' });
        setShowAddForm(true);
        setShowEditForm(false);
    };

    const addUser = () => {
        setData(prevData => [
            ...prevData,
            { ...formData, id: Date.now() }
        ]);

        setFormData({
            id: null,
            username: '',
            email: '',
            password: '',
            authorization: 'User',
        });
        setShowAddForm(false);
    };

    const handleUpdate = () => {
        setData(prevData =>
            prevData.map(item =>
                item.id === formData.id ? { ...formData } : item
            )
        );

        setFormData({
            id: null,
            username: '',
            email: '',
            password: '',
            authorization: 'User',
        });
        setShowEditForm(false);
    };

    return (
        <div className='user-table'>
            <div className='table-header'>
                <form className="form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="input"
                        required
                        type="text"
                    />
                    <button className="reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
                <button className="add-button" onClick={handleAdd}>
                    <FaPlus className="add-icon" /> Add New User
                </button>
            </div>
            <div className='showSlider-users'>
                {showAddForm && (
                    <div className="add-user-form">
                        <h3>Add New User</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <div className="authorization-toggle">
                            <label>Authorization: </label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={formData.authorization === 'Admin'}
                                    onChange={handleAuthorizationToggle}
                                />
                                <span className="slider round"></span>
                            </label>
                            {formData.authorization}
                        </div>
                        <button className="submit-button" onClick={addUser}>
                            Add User
                        </button>
                        <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                            Cancel
                        </button>
                    </div>
                )}

                {showEditForm && (
                    <div className="add-user-form">
                        <h3>Edit User</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <div className="authorization-toggle">
                            <label>Authorization: </label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={formData.authorization === 'Admin'}
                                    onChange={handleAuthorizationToggle}
                                />
                                <span className="slider round"></span>
                            </label>
                            {formData.authorization}
                        </div>
                        <button className="submit-button" onClick={handleUpdate}>
                            Update User
                        </button>
                        <button className="cancel-button" onClick={() => setShowEditForm(false)}>
                            Cancel
                        </button>
                    </div>
                )}

            </div>
            <div className="users-table">
                <table className='user-table' {...getTableProps()}>
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
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageOptions.length}
                        onPageChange={(e) => gotoPage(e.selected)}
                        containerClassName={"pagination-container"}
                        activeClassName={"pagination-active"}
                        pageClassName={"pagination-page"}
                        previousClassName={"pagination-previous"}
                        nextClassName={"pagination-next"}
                        disabledClassName={"pagination-disabled"}
                    />
                </div>

            </div>
        </div>
    );
};

export default UserTable;
