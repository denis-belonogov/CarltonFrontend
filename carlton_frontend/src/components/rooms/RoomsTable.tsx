import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { SelectButton } from "primereact/selectbutton";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteRoom, getRooms } from "../../services/roomsService";
import { Key } from "../keys/Key";
import { Room, roomStyle } from "./Room";

interface RoomsTableProps {
  rooms: Room[];
  setRooms: (value: []) => void;
}

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, setRooms }) => {
  const [coloring, setColoring] = useState("On");
  const navigate = useNavigate();
  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const click = async (row: Room) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoom(row.id, () => {
        getRooms(setRooms);
      });
    }
  };

  const deleteButton = (data: any) => {
    return (
      <Button
        style={{ border: "none" }}
        icon="pi pi-trash"
        rounded
        outlined
        onClick={() => {
          click(data);
        }}
      ></Button>
    );
  };

  const rowClass = (room: Room) => {
    if (coloring === "On") {
      return roomStyle(room);
    }
    return "room";
  };

  return (
    <div>
      <DataTable
        value={rooms}
        stripedRows
        removableSort
        showGridlines
        className="table"
        filterDisplay="menu"
        rowClassName={rowClass}
        header={
          <div className="flex">
            <h2
              style={{
                marginLeft: "auto",
                marginRight: "10px",
                marginTop: "auto",
                marginBottom: "auto",
                backgroundColor: "#f9fafb",
              }}
            >
              Table coloring
            </h2>
            <SelectButton
              style={{ backgroundColor: "#f9fafb" }}
              value={coloring}
              onChange={(e) => setColoring(e.value)}
              options={["On", "Off"]}
            />
          </div>
        }
      >
        <Column
          field="id"
          header="id"
          sortable
          filter
          style={{ width: "5%" }}
          dataType="numeric"
          filterPlaceholder="Search by id"
          alignHeader={"center"}
          body={(rowData) => {
            return <Link to={`/room/${rowData.id}`}>{rowData.id}</Link>;
          }}
        ></Column>
        <Column
          field="name"
          header="Room Name"
          style={{ width: "20%" }}
          sortable
          alignHeader={"center"}
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="floor"
          header="Floor"
          style={{ width: "5%" }}
          sortable
          dataType="numeric"
          alignHeader={"center"}
          filter
          filterPlaceholder="Search by floor"
        />
        <Column field="type" header="Type" sortable alignHeader={"center"} />
        <Column
          field="dead"
          header="Dead"
          style={{ width: "5%" }}
          sortable
          alignHeader={"center"}
          body={(rowData) => {
            return <Checkbox checked={rowData.dead} disabled></Checkbox>;
          }}
        ></Column>
        <Column
          field="keys"
          header="Keys"
          style={{ width: "50%" }}
          alignHeader={"center"}
          body={(rowData) => {
            return rowData.keys.map((key: Key) => (
              <Chip
                key={key.id}
                label={key.id.toString()}
                className="mr-2 chip"
                onClick={(e) => {
                  navigate(`/key/${key.id}`);
                }}
              />
            ));
          }}
        ></Column>
        <Column field="actions" header="Actions" alignHeader={"center"} style={{ width: "5%" }} body={deleteButton} />
      </DataTable>
    </div>
  );
};

export default RoomsTable;
