import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import React, { useEffect } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { deleteRoom, getRooms } from "../../services/roomsService";
import { Button } from "primereact/button";

enum RoomType {
  GUEST = "Guest",
  STAFF = "Staff",
}

interface Room {
  id: number;
  name: string;
  floor: number;
  type: RoomType;
  [key: string]: any;
}

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
      <DataTable value={rooms} stripedRows removableSort showGridlines className="table">
        <Column field="id" header="id" sortable alignHeader={"center"}></Column>
        <Column field="name" header="Room Name" sortable alignHeader={"center"}></Column>
        <Column field="floor" header="Floor" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Type" sortable alignHeader={"center"}></Column>
        <Column field="actions" header="Actions" alignHeader={"center"} body={deleteButton}></Column>
      </DataTable>
    </div>
  );
};

export default RoomsTable;
