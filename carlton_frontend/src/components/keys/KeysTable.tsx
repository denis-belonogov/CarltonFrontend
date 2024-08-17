import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/lara-light-blue/theme.css";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/KeysList.css";
import { deleteKey, getKeys } from "../../services/keysService";
import { Room, roomColour } from "../rooms/Room";
import { Key } from "./Key";

interface KeysTableProps {
  keys: Key[];
  setKeys: (value: []) => void;
}

const KeysTable: React.FC<KeysTableProps> = ({ keys, setKeys }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getKeys(setKeys);
  }, []);

  const click = async (row: Key) => {
    if (window.confirm("Are you sure you want to delete this key?")) {
      deleteKey(row.id, () => {
        getKeys(setKeys);
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

  return (
    <>
      <DataTable value={keys} stripedRows removableSort showGridlines className="table" filterDisplay="menu">
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
            return <Link to={`/key/${rowData.id}`}>{rowData.id}</Link>;
          }}
        ></Column>
        <Column
          alignHeader={"center"}
          field="name"
          header="Key Name"
          style={{ width: "20%" }}
          filter
          filterPlaceholder="Search by name"
          sortable
        ></Column>
        <Column
          field="brand"
          header="Brand"
          sortable
          style={{ width: "20%" }}
          filter
          filterPlaceholder="Search by brand"
          alignHeader={"center"}
        ></Column>
        <Column
          field="amount"
          header="Quantity"
          sortable
          style={{ width: "5%" }}
          alignHeader={"center"}
          filter
          dataType="numeric"
          filterPlaceholder="Search by quantity"
        ></Column>
        <Column
          field="rooms"
          header="Rooms"
          style={{ width: "50%" }}
          alignHeader={"center"}
          body={(rowData) => {
            return rowData.rooms.map((room: Room) => (
              <Chip
                key={room.id}
                label={room.name}
                className="mr-2 chip"
                style={{ backgroundColor: roomColour(room) }}
                onClick={(e) => {
                  navigate(`/room/${room.id}`);
                }}
              />
            ));
          }}
        ></Column>
        <Column
          style={{ width: "5%" }}
          field="actions"
          header="Actions"
          alignHeader={"center"}
          body={deleteButton}
        ></Column>
      </DataTable>
    </>
  );
};

export default KeysTable;
