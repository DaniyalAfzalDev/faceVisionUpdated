import React, { useState } from "react";
import ShiftManagementTable from "./ShiftManagementTable";

const Shift_Management = () => {
    const [data, setData] = useState([
        {
            ShiftId: 1,
            shiftName: "Morning Shift",
            startTime: "08:00 AM",
            endTime: "04:00 PM",
          },
          {
            ShiftId: 2,
            shiftName: "Afternoon Shift",
            startTime: "12:00 PM",
            endTime: "08:00 PM",
          },
          {
            ShiftId: 3,
            shiftName: "Evening Shift",
            startTime: "04:00 PM",
            endTime: "12:00 AM",
          },
          {
            ShiftId: 4,
            shiftName: "Night Shift",
            startTime: "10:00 PM",
            endTime: "06:00 AM",
          },
          {
            ShiftId: 5,
            shiftName: "Early Morning Shift",
            startTime: "06:00 AM",
            endTime: "02:00 PM",
          },
          {
            ShiftId: 6,
            shiftName: "Split Shift",
            startTime: "08:00 AM",
            endTime: "12:00 PM",
          },
          {
            ShiftId: 7,
            shiftName: "Late Evening Shift",
            startTime: "06:00 PM",
            endTime: "02:00 AM",
          },
          {
            ShiftId: 8,
            shiftName: "Graveyard Shift",
            startTime: "12:00 AM",
            endTime: "08:00 AM",
          },
          {
            ShiftId: 9,
            shiftName: "Rotating Shift",
            startTime: "08:00 AM",
            endTime: "04:00 PM",
          },
          {
            ShiftId: 10,
            shiftName: "Weekend Shift",
            startTime: "10:00 AM",
            endTime: "06:00 PM",
          },
    ])
    return (
        <div>
            <ShiftManagementTable data={data} setData={setData}/>
        </div>
    );
};

export default Shift_Management;
