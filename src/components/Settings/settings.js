import React, { useState } from 'react';
import './settings.css';

import AttendancePolicy from './Setting_Tabs/AttendancePolicy';
import BasicSettings from './Setting_Tabs/BasicSettings';
import LeaveSettings from './Setting_Tabs/LeaveSettings';
import OvertimeSettings from './Setting_Tabs/OvertimeSettings';
import ShiftSettings from './Setting_Tabs/ShiftSettings';
import User from './Setting_Tabs/User';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('attendance-policy');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'attendance-policy':
                return <AttendancePolicy />;
            case 'basic-settings':
                return <BasicSettings/>;
            case 'leave-settings':
                return <LeaveSettings />;
            case 'overtime-settings':
                return <OvertimeSettings />;  
            case 'shift-settings':
                return <ShiftSettings />;
            case 'users':
                return <User />;
            default:
                return <AttendancePolicy />;
        }
    };

    return (
        <div className="settings-page">
            <div className="tabs">
                <button className={`${activeTab === 'attendance-policy' ? 'active' : ''}`} onClick={() => setActiveTab('attendance-policy')}>Attendance Policy</button>
                <button className={`${activeTab === 'basic-settings' ? 'active' : ''}`} onClick={() => setActiveTab('basic-settings')}>Basic Settings</button>
                <button className={`${activeTab === 'leave-settings' ? 'active' : ''}`} onClick={() => setActiveTab('leave-settings')}>Leaves Settings</button>
                <button className={`${activeTab === 'overtime-settings' ? 'active' : ''}`} onClick={() => setActiveTab('overtime-settings')}>Overtime Settings</button>
                <button className={`${activeTab === 'shift-settings' ? 'active' : ''}`} onClick={() => setActiveTab('shift-settings')}>Shift Settings</button>
                <button className={`${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Settings;
