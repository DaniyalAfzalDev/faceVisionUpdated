import React, { useState, useMemo, useCallback } from "react";
import { useTable, usePagination } from "react-table";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "./devices.css"; // Custom CSS for styling

const DeviceTable = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    deviceName: "",
    deviceIP: "",
    devicePort: "",
    status: "Inactive",
  });

  const handleStatusToggle = useCallback(() => {
    setFormData((prevState) => ({
      ...prevState,
      status: prevState.status === "Active" ? "Inactive" : "Active",
    }));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "serial",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Device Name",
        accessor: "deviceName",
        Cell: ({ value }) => (
          <span className='bold-fonts'>{value}</span>
        ),
      },
      {
        Header: "Device IP",
        accessor: "deviceIP",
        Cell: ({ value }) => (
          <span className='bold-fonts'>{value}</span>
        ),
      },
      {
        Header: "Device Port",
        accessor: "devicePort",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`status ${
              value === "Active" ? "activeStatus" : "inactiveStatus"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleEdit(row.original)}
              style={{ background: "none", border: "none" }}
            >
              <FaEdit className="table-edit" />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              style={{ background: "none", border: "none" }}
            >
              <FaTrash className="table-delete" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
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
    usePagination
  );

  const handleEdit = (row) => {
    setFormData({
      id: row.id,
      deviceName: row.deviceName,
      deviceIP: row.deviceIP,
      devicePort: row.devicePort,
      status: row.status,
    });
    setShowAddForm(false);
    setShowEditForm(true);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.id !== row.id));
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      deviceName: "",
      deviceIP: "",
      devicePort: "",
      status: "Inactive",
    });
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const addDevice = () => {
    // Add device to the table
    setData((prevData) => [...prevData, { ...formData, id: Date.now() }]);

    // Reset form data
    setFormData({
      id: null,
      deviceName: "",
      deviceIP: "",
      devicePort: "",
      status: "Inactive",
    });

    // Hide form
    setShowAddForm(false);
  };

  const handleUpdate = () => {
    // Update the device data
    setData((prevData) =>
      prevData.map((item) => (item.id === formData.id ? { ...formData } : item))
    );

    // Optionally reset form data
    setFormData({
      id: null,
      deviceName: "",
      deviceIP: "",
      devicePort: "",
      status: "Inactive",
    });

    // Hide the edit form
    setShowEditForm(false);
  };

  return (
    <div className="device-table">
      <div className="table-header">
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <button className="add-button" onClick={handleAdd}>
          <FaPlus className="add-icon" /> Add New Device
        </button>
      </div>

      {/* Add Device Form */}
      {showAddForm && (
        <div className="add-device-form">
          <h3>Add New Device</h3>
          <input
            type="text"
            placeholder="Device Name"
            value={formData.deviceName}
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Device IP"
            value={formData.deviceIP}
            onChange={(e) =>
              setFormData({ ...formData, deviceIP: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Device Port"
            value={formData.devicePort}
            onChange={(e) =>
              setFormData({ ...formData, devicePort: e.target.value })
            }
          />
          <div className="status-toggle">
            <label>Status: </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={formData.status === "Active"}
                onChange={handleStatusToggle}
              />
              <span className="slider round"></span>
            </label>
            {formData.status}
          </div>
          <button className="submit-button" onClick={addDevice}>
            Add Device
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Edit Device Form */}
      {showEditForm && (
        <div className="add-device-form">
          <h3>Edit Device</h3>
          <input
            type="text"
            placeholder="Device Name"
            value={formData.deviceName}
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Device IP"
            value={formData.deviceIP}
            onChange={(e) =>
              setFormData({ ...formData, deviceIP: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Device Port"
            value={formData.devicePort}
            onChange={(e) =>
              setFormData({ ...formData, devicePort: e.target.value })
            }
          />
          <div className="status-toggle">
            <label>Status: </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={formData.status === "Active"}
                onChange={handleStatusToggle}
              />
              <span className="slider round"></span>
            </label>
            {formData.status}
          </div>
          <button className="submit-button" onClick={handleUpdate}>
            Update Device
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="departments-table">
        <table className="device-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageOptions.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => gotoPage(selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default DeviceTable;
