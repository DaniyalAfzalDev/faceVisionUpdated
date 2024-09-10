import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../Settings/Setting_Tabs/leave.css";

const BlockEmployeeTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      department: "HR",
      contactNumber: "1234567890",
      status: "Blocked",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      department: "Finance",
      contactNumber: "0987654321",
      status: "Active",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentItemId, setCurrentItemId] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [status, setStatus] = useState("Blocked");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEmployeeName(itemToEdit.employeeName);
      setDepartment(itemToEdit.department);
      setContactNumber(itemToEdit.contactNumber);
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
    setEmployeeName("");
    setDepartment("");
    setContactNumber("");
    setStatus("Blocked");
    setShowForm(true);
  };

  const handleSaveItem = () => {
    if (formMode === "add") {
      const newItem = {
        id: data.length + 1,
        employeeName,
        department,
        contactNumber,
        status,
      };
      setData([...data, newItem]);
    } else if (formMode === "edit") {
      const updatedData = data.map((item) =>
        item.id === currentItemId
          ? { ...item, employeeName, department, contactNumber, status }
          : item
      );
      setData(updatedData);
    }
    resetForm();
  };

  const resetForm = () => {
    setEmployeeName("");
    setDepartment("");
    setContactNumber("");
    setStatus("Blocked");
    setCurrentItemId(null);
    setFormMode("add");
    setShowForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Blocked">Blocked</option>
            <option value="Active">Active</option>
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
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Contact Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.employeeName}</td>
                <td>{item.department}</td>
                <td>{item.contactNumber}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(item.id)}
                  >
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
