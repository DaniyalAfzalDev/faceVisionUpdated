import React, { useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import Navbar from '../Navbar/navbar';
import './dashboard.css';
import Department from '../Enrollment/Department/department';
import Designation from '../Enrollment/Designation/designation';
import Location from '../Enrollment/Location/location';
import Employee from '../Enrollment/Employees/employees';
import Device from '../Devices/devices';
import Attendance from '../Attendence/attendence'; 
import Leaves from '../Leaves/leaves'; 
import ShiftManagement from '../Shift_Managment/shift_managment'; 
import Bonuses from '../Payroll/Bouneses/bouneses'; 
import Reports from '../Reports/reports'; 
import Visitors from '../Visitors/visitors'; 
import Blocklist from '../Blocklist/blocklist'; 
import Settings from '../Settings/settings'; 
import Resign from '../Enrollment/Resign/resign';
import EmployeeProfile from '../Payroll/Employee_Profile/employee_profile'
import PayRollLog from '../Payroll/Payroll_Logs/payroll_log'
import Dashboard from '../Dashboard/dashboard';
import Profile from '../Profile/profile';
const Home = () => {
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');  // Default to an empty string or a specific page
    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
    };

    // Function to render the selected component based on the selected menu
    const renderContent = () => {
        switch (selectedMenu) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Department':
                return <Department />;
            case 'Designation':
                return <Designation />;
            case 'Location':
                return <Location />;
            case 'Employee':
                return <Employee />;
            case 'Resign':
                return <Resign />;
            case 'Devices':
                return <Device />;
            case 'Attendance':
                return <Attendance />;
            case 'Leaves':
                return <Leaves />;
            case 'ShiftManagement':
                return <ShiftManagement />;
            case 'Bonuses':
                return <Bonuses />;
            case 'Reports':
                return <Reports />;
            case 'EmployeeProfile':
                return <EmployeeProfile />;
            case 'PayRollLog':
                return <PayRollLog />;
            case 'Visitors':
                return <Visitors />;
            case 'Blocklist':
                return <Blocklist />;
            case 'Settings':
                return <Settings />;
            case 'Profile':
                return <Profile />;
            default:
                return <p>Select a menu item from the sidebar to see the content.</p>;
        }
    };

    return (
        <div className="dashboard">
            <Sidebar onMenuChange={handleMenuChange} />
            <div className="dashboard-content">
                <Navbar selectedMenu={selectedMenu} />
                <div className="main-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Home;
