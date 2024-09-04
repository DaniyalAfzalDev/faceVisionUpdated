import React, { useState } from 'react';
import TableComponent from './departmentTable';
const Department = () => {
    const [data, setData] = useState([
        { departmentName: 'HR', superior: 'John Doe', employeeQty: 5 },
        { departmentName: 'IT', superior: 'Jane Smith', employeeQty: 12 },
        { departmentName: 'Finance', superior: 'Richard Roe', employeeQty: 7 },
        { departmentName: 'Marketing', superior: 'Emily Johnson', employeeQty: 8 },
        { departmentName: 'Sales', superior: 'Michael Brown', employeeQty: 15 },
        { departmentName: 'Customer Service', superior: 'Jessica Davis', employeeQty: 10 },
        { departmentName: 'Engineering', superior: 'David Wilson', employeeQty: 20 },
        { departmentName: 'Legal', superior: 'Sarah Miller', employeeQty: 6 },
        { departmentName: 'Product', superior: 'James Anderson', employeeQty: 9 },
        { departmentName: 'Design', superior: 'Laura Thomas', employeeQty: 11 },
        { departmentName: 'R&D', superior: 'Daniel Martinez', employeeQty: 14 },
        { departmentName: 'Operations', superior: 'Sophia Rodriguez', employeeQty: 13 },
        { departmentName: 'Quality Assurance', superior: 'Robert Lee', employeeQty: 8 },
        { departmentName: 'IT Support', superior: 'Olivia Walker', employeeQty: 7 },
        { departmentName: 'Business Development', superior: 'William Harris', employeeQty: 10 },
        { departmentName: 'Training', superior: 'Mia Lewis', employeeQty: 5 },
        { departmentName: 'Administration', superior: 'Lucas Young', employeeQty: 6 },
        { departmentName: 'Public Relations', superior: 'Charlotte King', employeeQty: 9 },
        { departmentName: 'Procurement', superior: 'Elijah Scott', employeeQty: 11 },
        { departmentName: 'Logistics', superior: 'Amelia Adams', employeeQty: 12 },
        { departmentName: 'Strategy', superior: 'Alexander Baker', employeeQty: 13 },
    ]);
    

    return (
        <div>
            <TableComponent data={data} setData={setData} />
        </div>
    )
}
export default Department;