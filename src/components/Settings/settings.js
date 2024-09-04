import React, { useState } from 'react';
import './settings.css';

// import AttendancePolicy from './Setting_Tabs/AttendancePolicy';
// import basicSettings from './Setting_Tabs/basicSettings.js';
// import LeaveSettings from './Setting_Tabs/leaveSettings';
// import OvertimeSettings from './Setting_Tabs/OvertimeSettings';
// import ShiftSettings from './Setting_Tabs/ShiftSettings'; 

const Settings = () => {
    const [activeTab, setActiveTab] = useState('attendance-policy');

    const renderTabContent = () => {
        switch (activeTab) {
            // case 'attendance-policy':
                // return <AttendancePolicy />;
            // case 'basic-settings':
            //     return <BasicSettings />;
            // case 'leave-settings':
            //     return <LeaveSettings />;
            // case 'overtime-settings':
            //     return <OvertimeSettings />;  
            // case 'shift-settings':
            //     return <ShiftSettings />;
            // default:
                // return <AttendancePolicy />;
        }
    };

    return (
        <div className="settings-page">
            {/* <div className="tabs">
                <button onClick={() => setActiveTab('attendance-policy')}>Attendance Policy</button>
                <button onClick={() => setActiveTab('basic-settings')}>Basic</button>
                <button onClick={() => setActiveTab('leave-settings')}>Leaves</button>
                <button onClick={() => setActiveTab('overtime-settings')}>Overtime</button>
                <button onClick={() => setActiveTab('shift-settings')}>Shift</button>
            </div> */}
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Settings;
