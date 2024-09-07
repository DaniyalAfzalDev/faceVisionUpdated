import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";
import "../Settings/Setting_Tabs/leave.css";

const BlockEmployeeTable = () => {
    const [data, setData] = useState([
        { id: 1, employeeId: "E001", name: "John Doe", department: "HR", email: "john@example.com", status: "Blocked" },
        { id: 2, employeeId: "E002", name: "Jane Smith", department: "Finance", email: "jane@example.com", status: "Active" },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState("add"); // "add" or "edit"
    const [currentItemId, setCurrentItemId] = useState(null); // Store ID of item being edited
    const [employeeId, setEmployeeId] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setEmployeeId(itemToEdit.employeeId);
            setName(itemToEdit.name);
            setDepartment(itemToEdit.department);
            setEmail(itemToEdit.email);
            setStatus(itemToEdit.status);
            setCurrentItemId(id);
            setFormMode("edit");
            setShowForm(true);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleAddNew = () => {
        setFormMode("add");
        setEmployeeId("");
        setName("");
        setDepartment("");
        setEmail("");
        setStatus("");
        setShowForm(true);
    };

    const handleSaveItem = () => {
        if (formMode === "add") {
            const newItem = {
                id: data.length + 1, // Simple ID increment
                employeeId,
                name,
                department,
                email,
                status,
            };
            setData([...data, newItem]);
        } else if (formMode === "edit") {
            const updatedData = data.map((item) =>
                item.id === currentItemId ? { ...item, employeeId, name, department, email, status } : item
            );
            setData(updatedData);
        }
        resetForm();
    };

    const resetForm = () => {
        setEmployeeId("");
        setName("");
        setDepartment("");
        setEmail("");
        setStatus("");
        setCurrentItemId(null);
        setFormMode("add");
        setShowForm(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <div className="leave-header">
                <form className="form">
                    <button>
                        <svg
                            width="17"
                            height="16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-labelledby="search"
                        >
                            <path
                                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                                stroke="currentColor"
                                strokeWidth="1.333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="input"
                        required
                        type="text"
                    />
                    <button className="reset" type="reset">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </form>
                <button className="addLeave" onClick={handleAddNew}>
                    <FontAwesomeIcon icon={faPlus} /> Block New Employee
                </button>
            </div>

            {showForm && (
                <div className="add-leave-form">
                    <h4>{formMode === "add" ? "Add New Employee" : "Edit Employee"}</h4>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <select
                    className="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <button className="submit-button" onClick={handleSaveItem}>
                        {formMode === "add" ? "Add" : "Update"}
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            )}

            <div className="leave-table-outer">
                <table className="leave-table">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.employeeId}</td>
                                <td>{item.name}</td>
                                <td>{item.department}</td>
                                <td>{item.email}</td>
                                <td style={{ color: item.status === "Blocked" ? "red" : "green" }}>
                                    {item.status}
                                </td>
                                <td>
                                    <button className="action-button edit" onClick={() => handleEdit(item.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="action-button delete" onClick={() => handleDelete(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlockEmployeeTable;
