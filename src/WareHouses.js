import React, { useContext } from "react";
import MaterialTable from "material-table";
import NavigateNextSharpIcon from "@material-ui/icons/NavigateNextSharp";
import AppDataContext from "./AppDataContext";

export default function WareHouses() {
  const [columns, setColumns] = React.useState([
    { title: "Warehouse", field: "name" },
    { title: "zipcode", field: "zipcode" },
    { title: "Birth Year", field: "birthYear", type: "numeric" }
  ]);
  const [tableData, setTableData] = React.useState([]);

  const appData = useContext(AppDataContext);

  console.log(appData);

  return (
    <MaterialTable
      title="Editable Example"
      columns={columns}
      data={tableData}
      options={{
        selection: true
      }}
      actions={[
        {
          tooltip: "Choose the warehouse for delivery",
          icon: NavigateNextSharpIcon,
          onClick: (evt, data) =>
            alert("You want to delete " + data.length + " rows")
        }
      ]}
    />
  );
}
