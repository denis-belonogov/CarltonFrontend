import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, getRooms } from "../../services/roomsService";
import { Room } from "./Room";

interface RoomsTableProps {
  rooms: Room[];
  setRooms: (value: []) => void;
}

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, setRooms }) => {
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
        icon="pi pi-trash"
        rounded
        outlined
        onClick={() => {
          click(data);
        }}
      ></Button>
    );
  };

  return (
    <div>
      <DataTable
        value={rooms}
        stripedRows
        removableSort
        showGridlines
        className="table"
      >
        <Column
          field="id"
          header="id"
          sortable
          alignHeader={"center"}
          body={(rowData) => {
            return <Link to={`/room/${rowData.id}`}>{rowData.id}</Link>;
          }}
        ></Column>
        <Column
          field="name"
          header="Room Name"
          sortable
          alignHeader={"center"}
        ></Column>
        <Column
          field="floor"
          header="Floor"
          sortable
          alignHeader={"center"}
        ></Column>
        <Column
          field="type"
          header="Type"
          sortable
          alignHeader={"center"}
        ></Column>
        <Column
          field="dead"
          header="Dead"
          sortable
          alignHeader={"center"}
          body={(rowData) => {
            return <Checkbox checked={rowData.dead} disabled></Checkbox>;
          }}
        ></Column>
        <Column
          field="actions"
          header="Actions"
          alignHeader={"center"}
          body={deleteButton}
        ></Column>
      </DataTable>
    </div>
  );
};

export default RoomsTable;
