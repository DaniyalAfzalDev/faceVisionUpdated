import React, { useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt, faUserPlus, faMobileAlt, faCalendarCheck,
    faCalendarAlt, faCogs, faMoneyCheckAlt, faChartBar,
    faUsers, faBan, faCog, faUser, faBuilding, faTag,
    faMapMarkerAlt, faIdBadge, faSignOutAlt, faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onMenuChange }) => {
    const [activeMenu, setActiveMenu] = useState('');
    const [activeButton, setActiveButton] = useState('Dashboard'); // State for active button

    const handleMenuClick = (menu) => {
        setActiveMenu(menu === activeMenu ? '' : menu);
        setActiveButton(menu); // Set the clicked button as active
    };

    const passValue = (menu) => {
        onMenuChange(menu);
        setActiveButton(menu); // Set the clicked button as active
    };

    return (
        <div className="sidebar">
            <h2>FaceVision</h2>
            <div className="sidebar-main">
                <div className="sidebar-menu">
                    <button className={`menu-item ${activeButton === 'Dashboard' ? 'active' : ''}`} onClick={() => passValue('Dashboard')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faTachometerAlt} /> Dashboard
                    </button>
                    <button className={`menu-item ${activeButton === 'Enrollment' ? 'active' : ''}`} onClick={() => handleMenuClick('Enrollment')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faUserPlus} /> Enrollment
                        <FontAwesomeIcon className='sidebar-icon arrow-icon'
                            icon={activeMenu === 'Enrollment' ? faChevronUp : faChevronDown}
                        />
                    </button>
                    {activeMenu === 'Enrollment' && (
                        <ul className="submenu">
                            <button className={`submenu-item ${activeButton === 'Department' ? 'active' : ''}`} onClick={() => passValue('Department')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faBuilding} /> Department
                            </button>
                            <button className={`submenu-item ${activeButton === 'Designation' ? 'active' : ''}`} onClick={() => passValue('Designation')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faTag} /> Designation
                            </button>
                            <button className={`submenu-item ${activeButton === 'Location' ? 'active' : ''}`} onClick={() => passValue('Location')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faMapMarkerAlt} /> Location
                            </button>
                            <button className={`submenu-item ${activeButton === 'Employee' ? 'active' : ''}`} onClick={() => passValue('Employee')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faIdBadge} /> Employee
                            </button>
                            <button className={`submenu-item ${activeButton === 'Resign' ? 'active' : ''}`} onClick={() => passValue('Resign')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faSignOutAlt} /> Resign
                            </button>
                        </ul>
                    )}
                    <button className={`menu-item ${activeButton === 'Devices' ? 'active' : ''}`} onClick={() => passValue('Devices')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faMobileAlt} /> Devices
                    </button>
                    <button className={`menu-item ${activeButton === 'Attendance' ? 'active' : ''}`} onClick={() => passValue('Attendance')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faCalendarCheck} /> Attendance
                    </button>
                    <button className={`menu-item ${activeButton === 'Leaves' ? 'active' : ''}`} onClick={() => passValue('Leaves')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faCalendarAlt} /> Leaves
                    </button>
                    <button className={`menu-item ${activeButton === 'ShiftManagement' ? 'active' : ''}`} onClick={() => passValue('ShiftManagement')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faCogs} /> Shift Management
                    </button>
                    <button className={`menu-item ${activeButton === 'Payroll' ? 'active' : ''}`} onClick={() => handleMenuClick('Payroll')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faMoneyCheckAlt} /> Payroll
                        <FontAwesomeIcon className='sidebar-icon arrow-icon'
                            icon={activeMenu === 'Payroll' ? faChevronUp : faChevronDown}
                        />
                    </button>
                    {activeMenu === 'Payroll' && (
                        <ul className="submenu">
                            <button className={`submenu-item ${activeButton === 'EmployeeProfile' ? 'active' : ''}`} onClick={() => passValue('EmployeeProfile')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faUser} /> Employee Profile
                            </button>
                            <button className={`submenu-item ${activeButton === 'PayRollLog' ? 'active' : ''}`} onClick={() => passValue('PayRollLog')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faCalendarAlt} /> Payroll Log
                            </button>
                            <button className={`submenu-item ${activeButton === 'Bonuses' ? 'active' : ''}`} onClick={() => passValue('Bonuses')}>
                                <FontAwesomeIcon className='sidebar-icon' icon={faMoneyCheckAlt} /> Bonuses
                            </button>
                        </ul>
                    )}
                    <button className={`menu-item ${activeButton === 'Reports' ? 'active' : ''}`} onClick={() => passValue('Reports')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faChartBar} /> Reports
                    </button>
                    <button className={`menu-item ${activeButton === 'Visitors' ? 'active' : ''}`} onClick={() => passValue('Visitors')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faUsers} /> Visitors
                    </button>
                    <button className={`menu-item ${activeButton === 'Blocklist' ? 'active' : ''}`} onClick={() => passValue('Blocklist')}>
                        <FontAwesomeIcon className='sidebar-icon' icon={faBan} /> Blocklist
                    </button>
                </div>
                <div className="sidebar-footer">
                    <button className={`footer-item ${activeButton === 'Settings' ? 'active' : ''}`} onClick={() => passValue('Settings')}>
                        <FontAwesomeIcon icon={faCog} /> Settings
                    </button>
                    <button style={{ borderTop: '1px solid silver', height: '5vh' }} className={`footer-item ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => passValue('Profile')}>
                        <FontAwesomeIcon icon={faUser} /> Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
