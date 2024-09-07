import React, { useState, useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { FaEdit, FaTrash, FaPlus, FaFileAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "./employees.css";

const EmployeeTable = ({ data, setData, activeTab, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    employeeId: null,
    employeeName: "",
    department: "",
    enrollSite: "",
    salaryType: "",
    contactNo: "",
    basicSalary: "",
    accountNo: "",
    bankName: "",
    image: "",
  });

  // Define employee table columns
  const columns = useMemo(
    () => [
      {
        Header: "Serial No",
        accessor: "serialNo",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Employee ID",
        accessor: "employeeId",
      },
      {
        Header: "Employee Name",
        accessor: "employeeName",
        Cell: ({ value }) => <span className="bold-fonts">{value}</span>,
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Enroll Site",
        accessor: "enrollSite",
      },
      {
        Header: "Salary Type",
        accessor: "salaryType",
      },
      {
        Header: "Contact No",
        accessor: "contactNo",
      },
      {
        Header: "Basic Salary",
        accessor: "basicSalary",
      },
      {
        Header: "Account No",
        accessor: "accountNo",
      },
      {
        Header: "Bank Name",
        accessor: "bankName",
      },
      {
        Header: "Image",
        accessor: "image",
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
            <button
              onClick={() => handleGenerateReport(row.original)}
              style={{ background: "none", border: "none" }}
            >
              <FaFileAlt className="report-selector-icon" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Filter the data based on search input
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
    usePagination,
    useRowSelect
  );

  // Handle Edit
  const handleEdit = (row) => {
    setFormData({
      employeeId: row.employeeId,
      employeeName: row.employeeName,
      department: row.department,
      enrollSite: row.enrollSite,
      salaryType: row.salaryType,
      contactNo: row.contactNo,
      basicSalary: row.basicSalary,
      accountNo: row.accountNo,
      bankName: row.bankName,
      image: row.image,
    });
  };

  // Handle Delete
  const handleDelete = (row) => {
    setData((prevData) =>
      prevData.filter((item) => item.employeeId !== row.employeeId)
    );
  };

  // Handle Generate Report
  const handleGenerateReport = (row) => {
    // Add logic for generating the report for the selected employee
    console.log("Generating report for:", row);
  };

  const handleAdd = () => {
    setActiveTab("Add Employee"); // Update the activeTab state from parent
  };

  return (
    <div className="employee-table">
      <div className="table-header">
        <form className="form">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="input"
            required
            type="text"
          />
        </form>
        <button className="add-button" onClick={handleAdd}>
          <FaPlus className="add-icon" /> Add New Employee
        </button>
      </div>
      <div className="departments-table">
        <table {...getTableProps()} className="table">
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
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageOptions.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => gotoPage(selected)}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
