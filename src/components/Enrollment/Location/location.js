import React, { useState } from "react";
import LocationTable from "./LocationTable";

const Location = () => {
  const [data, setData] = useState([
    {
      locationCode: "LOC001",
      locationName: "Headquarters",
      deviceQuantity: 50,
      employeeQuantity: 200,
      resignedQuantity: 5,
    },
    {
      locationCode: "LOC002",
      locationName: "Branch Office",
      deviceQuantity: 30,
      employeeQuantity: 100,
      resignedQuantity: 2,
    },
    {
      locationCode: "LOC003",
      locationName: "Warehouse",
      deviceQuantity: 20,
      employeeQuantity: 50,
      resignedQuantity: 0,
    },
    {
      locationCode: "LOC004",
      locationName: "R&D Center",
      deviceQuantity: 40,
      employeeQuantity: 150,
      resignedQuantity: 10,
    },
    {
      locationCode: "LOC005",
      locationName: "Regional Office",
      deviceQuantity: 25,
      employeeQuantity: 80,
      resignedQuantity: 3,
    },
  ]);
  return <div>
    <LocationTable data={data} setData={setData}/>
  </div>;
};

export default Location;
