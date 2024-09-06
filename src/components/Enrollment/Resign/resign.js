import React, { useState } from "react";
import ResignTable from "./ResignTable";

const Resign = () => {
  const [data, setData] = useState([
    {
      employeeName: "John Doe",
      date: "2024-08-15",
      reason: "Personal reasons",
    },
    {
      employeeName: "Jane Smith",
      date: "2024-08-20",
      reason: "Career change",
    },
    {
      employeeName: "Michael Johnson",
      date: "2024-08-25",
      reason: "Relocation",
    },
    {
      employeeName: "Emily Davis",
      date: "2024-08-30",
      reason: "Pursuing higher education",
    },
    {
      employeeName: "Chris Lee",
      date: "2024-09-01",
      reason: "Health issues",
    },
  ]);
  return (
    <div>
      <ResignTable data={data} setData={setData} />
    </div>
  );
};

export default Resign;
