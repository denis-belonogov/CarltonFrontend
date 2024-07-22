import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/md-light-indigo/theme.css";
import { deleteRoom, getRooms } from "../../services/roomsService";

enum RoomType {
  GUEST = "Guest",
  STAFF = "Staff",
}

interface Room {
  id: number;
  name: string;
  type: RoomType;
  floor: number;
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
      <button
        onClick={() => {
          click(data);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  };

  return (
    <div>
      <DataTable value={rooms} stripedRows removableSort showGridlines className="table">
        <Column field="id" header="id" sortable alignHeader={"center"}></Column>
        <Column field="name" header="Room Name" sortable alignHeader={"center"}></Column>
        <Column field="floor" header="Floor" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Type" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Type" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Actions" body={deleteButton}></Column>
      </DataTable>
    </div>
  );
};

export default RoomsTable;
