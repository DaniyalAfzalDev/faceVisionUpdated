import React, { useState } from "react";
import "./reports.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faSitemap, faCog } from "@fortawesome/free-solid-svg-icons";
import Advance_Salary_Reports from "../Tables/Advance_Salary_Reports/advance_salary_report";
// Import other report components as needed
// import DailyReport from '../Tables/DailyReport';
// import WeeklyReport from '../Tables/WeeklyReport';
// import MonthlyReport from '../Tables/MonthlyReport';
// import SummaryReport from '../Tables/SummaryReport';

import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const [reportSubtype, setReportSubtype] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const reportOptions = {
    daily: [
      "Daily Full time",
      "Daily Working Hours",
      "Daily Overtime",
      "Daily Late In",
      "Daily Absent",
    ],
    weekly: ["Weekly Full time", "Weekly Overtime", "Weekly Absent"],
    monthly: [
      "Monthly",
      "Monthly Entry Time",
      "Monthly Overtime",
      "Monthly Full time",
      "Monthly Absent",
    ],
    summary: [
      "All Attendance Summary",
      "Leaves Summary",
      "Overtime Summary",
      "Absent Summary",
    ],
    "advance-salary": [],
    "all-employee-salary": [],
  };

  const handleDataFromChild = (filteredData) => {
    setData(filteredData);
  };

  const downloadCSV = () => {
    if (data.length === 0) {
      alert("No data available to download!");
      return;
    }

    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((header) => row[header]));

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}.csv`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableElement = document.querySelector("table"); // Select table directly

    if (!tableElement) {
      console.error("Table element not found");
      return;
    }

  

    // Use autoTable plugin to create a table in the PDF
    doc.autoTable({
      html: tableElement,
      startY: 20,
    });

    doc.save(`${activeTab}.pdf`);
  };
 

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setReportSubtype("");
    setActiveTab(event.target.value);
  };

  const handleReportSubtypeChange = (event) => {
    setReportSubtype(event.target.value);
    setActiveTab(event.target.value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "daily":
        return <div>Daily Report Content</div>; // Replace with actual component
      case "weekly":
        return <div>Weekly Report Content</div>; // Replace with actual component
      case "monthly":
        return <div>Monthly Report Content</div>; // Replace with actual component
      case "summary":
        return <div>Summary Report Content</div>; // Replace with actual component
      case "advance-salary":
        return (
          <Advance_Salary_Reports
            sendDataToParent={handleDataFromChild}
            searchQuery={searchQuery}
          />
        );
      case "all-employee-salary":
        return <div>All Employee Salary Report Content</div>; // Replace with actual component
      default:
        return <div>Please select a report type</div>;
    }
  };

  return (
    <div>
      <div className="report">
        <div className="report-header">
          <h2>Select Report</h2>
          <div className="report-selector">
            <FontAwesomeIcon
              className="report-selector-icon"
              icon={faFileAlt}
            />
            <select value={reportType} onChange={handleReportTypeChange}>
              <option value="">-- Select a Report --</option>
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="summary">Summary Report</option>
              <option value="advance-salary">Advance Salary Report</option>
              <option value="all-employee-salary">
                All Employee Salary Report
              </option>
            </select>
          </div>

          {reportOptions[reportType]?.length > 0 && (
            <div className="report-selector">
              <FontAwesomeIcon
                className="report-selector-icon"
                icon={faSitemap}
              />
              <select
                value={reportSubtype}
                onChange={handleReportSubtypeChange}
              >
                <option value="">-- Select a Subtype --</option>
                {reportOptions[reportType].map((subtype, index) => (
                  <option
                    key={index}
                    value={subtype.toLowerCase().replace(/ /g, "-")}
                  >
                    {subtype}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="dropdown">
            <button className="generate-report-button">
              <FontAwesomeIcon icon={faCog} className="button-icon" />
              Generate Report
            </button>
            <ul className="dropdown-menu">
              <li onClick={downloadCSV}>Export as CSV</li>
              <li onClick={downloadPDF}>Export as PDF</li>
            </ul>
          </div>
          {/* <button className="generate-report-button" onClick={downloadCSV}>
          <FontAwesomeIcon icon={faCog} className="button-icon" />
          Generate Report
        </button> */}
        </div>
        <div>
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
        </div>
      </div>
      <div className="report-content">{renderContent()}</div>
    </div>
  );
};

export default Reports;
