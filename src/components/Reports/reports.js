import { React, useState } from "react";
import './reports.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt,faSitemap  } from '@fortawesome/free-solid-svg-icons';

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const [reportSubtype, setReportSubtype] = useState("");

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

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setReportSubtype(""); // Reset subtype when report type changes
  };

  const handleReportSubtypeChange = (event) => {
    setReportSubtype(event.target.value);
  };

  const renderTable = () => {
    if (!reportType) return null;

    // Here you can define the table structure based on reportType and reportSubtype
    return (
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="report">
        <h2>Select Report</h2>
        <div className="report-selector">
      <FontAwesomeIcon className="report-selector-icon" icon={faFileAlt} />
      <select value={reportType} onChange={handleReportTypeChange}>
        <option value="">-- Select a Report --</option>
        <option value="daily">Daily Report</option>
        <option value="weekly">Weekly Report</option>
        <option value="monthly">Monthly Report</option>
        <option value="summary">Summary Report</option>
        <option value="advance-salary">Advance Salary Report</option>
        <option value="all-employee-salary">All Employee Salary Report</option>
      </select>
    </div>

        {reportOptions[reportType]?.length > 0 && (
            <div className="report-selector">
            <FontAwesomeIcon className="report-selector-icon" icon={faSitemap } />
            <select value={reportSubtype} onChange={handleReportSubtypeChange}>
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
        //   <div>
        //     <select value={reportSubtype} onChange={handleReportSubtypeChange}>
        //       <option value="">-- Select a Subtype --</option>
        //       {reportOptions[reportType].map((subtype, index) => (
        //         <option
        //           key={index}
        //           value={subtype.toLowerCase().replace(/ /g, "-")}
        //         >
        //           {subtype}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        )}
        </div>
        {reportType && reportSubtype && (
          <div>
            <h3>
              Displaying {reportSubtype.replace(/-/g, " ")} for{" "}
              {reportType.replace(/-/g, " ")}
            </h3>
            {renderTable()}
          </div>
        )}
      
    </div>
  );
};

export default Reports;
