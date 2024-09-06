import React, { useState } from 'react';
import DesignationTable from './designationTable';

const Designation = () => {
    const [data, setData] = useState([
        {
          "designationCode": "D001",
          "designationName": "Software Engineer"
        },
        {
          "designationCode": "D002",
          "designationName": "Senior Software Engineer"
        },
        {
          "designationCode": "D003",
          "designationName": "Project Manager"
        },
        {
          "designationCode": "D004",
          "designationName": "Business Analyst"
        },
        {
          "designationCode": "D005",
          "designationName": "Quality Assurance Engineer"
        },
        {
          "designationCode": "D006",
          "designationName": "HR Manager"
        },
        {
          "designationCode": "D007",
          "designationName": "Marketing Specialist"
        },
        {
          "designationCode": "D008",
          "designationName": "Finance Manager"
        },
        {
          "designationCode": "D009",
          "designationName": "Operations Manager"
        },
        {
          "designationCode": "D010",
          "designationName": "R&D Engineer"
        }
      ])
    return (
        <div>
            <DesignationTable data={data} setData={setData}/>
        </div>
    );
};

export default Designation;
