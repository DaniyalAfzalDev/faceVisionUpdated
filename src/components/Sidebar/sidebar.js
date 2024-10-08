import React, { useState } from 'react';
import './sidebar.css';
import Logo from '../../assets/faceVisionLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt, faUserPlus, faMobileAlt, faCalendarCheck,
    faCalendarAlt, faCogs, faMoneyCheckAlt, faChartBar,
    faUsers, faBan, faCog, faUser, faBuilding, faTag,
    faMapMarkerAlt, faIdBadge, faSignOutAlt, faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
    { label: 'Dashboard', icon: faTachometerAlt },
    { label: 'Enrollment', icon: faUserPlus, submenu: [
        { label: 'Department', icon: faBuilding },
        { label: 'Designation', icon: faTag },
        { label: 'Location', icon: faMapMarkerAlt },
        { label: 'Employee', icon: faIdBadge },
        { label: 'Resign', icon: faSignOutAlt }
    ]},
    { label: 'Devices', icon: faMobileAlt },
    { label: 'Attendance', icon: faCalendarCheck },
    { label: 'Leaves', icon: faCalendarAlt },
    { label: 'Shift Management', icon: faCogs },
    { label: 'Payroll', icon: faMoneyCheckAlt, submenu: [
        { label: 'Employee Profile', icon: faUser },
        { label: 'Payroll Log', icon: faCalendarAlt },
        { label: 'Bonuses', icon: faMoneyCheckAlt }
    ]},
    { label: 'Reports', icon: faChartBar },
    { label: 'Visitors', icon: faUsers },
    { label: 'Block Employee', icon: faBan }
];

const Sidebar = ({ onMenuChange }) => {
    const [activeMenu, setActiveMenu] = useState('');
    const [activeButton, setActiveButton] = useState('Dashboard');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu === activeMenu ? '' : menu);
    };

    const handleButtonClick = (menu) => {
        onMenuChange(menu);
        setActiveButton(menu);
    };

    return (
        <div className="sidebar">
            <img src={Logo} alt="FaceVision Logo" className="logo" />
            <div className="sidebar-main">
                <div className="sidebar-menu">
                    {menuItems.map(item => (
                        <React.Fragment key={item.label}>
                            <button 
                                className={`menu-item ${activeButton === item.label ? 'active' : ''}`} 
                                onClick={() => item.submenu ? handleMenuClick(item.label) : handleButtonClick(item.label)}
                            >
                                <FontAwesomeIcon className='sidebar-icon' icon={item.icon} /> {item.label}
                                {item.submenu && (
                                    <FontAwesomeIcon className='sidebar-icon arrow-icon'
                                        icon={activeMenu === item.label ? faChevronUp : faChevronDown}
                                    />
                                )}
                            </button>
                            {item.submenu && activeMenu === item.label && (
                                <ul className="submenu">
                                    {item.submenu.map(subitem => (
                                        <button 
                                            key={subitem.label} 
                                            className={`submenu-item ${activeButton === subitem.label ? 'active' : ''}`} 
                                            onClick={() => handleButtonClick(subitem.label)}
                                        >
                                            <FontAwesomeIcon className='sidebar-icon' icon={subitem.icon} /> {subitem.label}
                                        </button>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="sidebar-footer">
                    <button className={`footer-item ${activeButton === 'Settings' ? 'active' : ''}`} onClick={() => handleButtonClick('Settings')}>
                        <FontAwesomeIcon icon={faCog} /> Settings
                    </button>
                    <button className={`footer-item ${activeButton === 'Profile' ? 'active' : ''}`} style={{ borderTop: '1px solid silver', height: '5vh' }} onClick={() => handleButtonClick('Profile')}>
                        <FontAwesomeIcon icon={faUser} /> Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
