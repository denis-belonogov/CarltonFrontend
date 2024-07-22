import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
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
  const [sortConfig, setSortConfig] = useState<{ key: string; ascending: boolean } | null>(null);

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

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>, room: Room) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoom(room.id, () => {
        getRooms(setRooms);
      });
    }
  };

  const sortedRooms = React.useMemo(() => {
    let sortableRooms = [...rooms];
    if (sortConfig !== null) {
      sortableRooms.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRooms;
  }, [rooms, sortConfig]);

  const requestSort = (key: string) => {
    var ascending = true;
    if (sortConfig && sortConfig.key === key && sortConfig.ascending) {
      ascending = false;
    }
    setSortConfig({ key, ascending });
  };

  const dateTemplate = (data: any) => {
    const rowData: Room = data;
    return (
      <button
        onClick={() => {
          click(rowData);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  };

  return (
    <div>
      <DataTable
        value={rooms}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        stripedRows
        removableSort
        showGridlines
        className="table"
      >
        <Column field="id" header="id" sortable alignHeader={"center"}></Column>
        <Column field="name" header="Room Name" sortable alignHeader={"center"}></Column>
        <Column field="floor" header="Floor" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Type" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Type" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Actions" body={dateTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default RoomsTable;
