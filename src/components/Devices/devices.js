import React, { useState } from 'react';
import DevicesTable from './devicesTable.js'

const Devices = () => {
    const [data, setData] = useState([
        { deviceName: 'Router A', deviceIP: '192.168.1.1', devicePort: 8080, status: 'Active' },
        { deviceName: 'Switch B', deviceIP: '192.168.1.2', devicePort: 8081, status: 'Inactive' },
        { deviceName: 'Firewall C', deviceIP: '192.168.1.3', devicePort: 8082, status: 'Active' },
        { deviceName: 'Server D', deviceIP: '192.168.1.4', devicePort: 8083, status: 'Active' },
        { deviceName: 'Access Point E', deviceIP: '192.168.1.5', devicePort: 8084, status: 'Inactive' },
    ]);

    return (
        <div>
            <DevicesTable data={data} setData={setData} />
        </div>
    )
}

export default Devices;
