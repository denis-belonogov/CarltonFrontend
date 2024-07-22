import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/md-light-indigo/theme.css";
import React, { useEffect } from "react";
import "../../../styles/KeysList.css";
import { deleteKey, getKeys } from "../../services/keysService";

interface Key {
  id: number;
  name: string;
  brand: string;
  room_name: string;
  amount: number;
}

interface KeysTableProps {
  keys: Key[];
  setKeys: (value: []) => void;
}

const KeysTable: React.FC<KeysTableProps> = ({ keys, setKeys }) => {
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
    <>
      <DataTable value={keys} stripedRows removableSort showGridlines className="table">
        <Column field="id" header="id" sortable alignHeader={"center"}></Column>
        <Column field="name" header="Key Name" sortable alignHeader={"center"}></Column>
        <Column field="brand" header="Brand" sortable alignHeader={"center"}></Column>
        <Column field="amount" header="Quantity" sortable alignHeader={"center"}></Column>
        <Column field="type" header="Actions" body={deleteButton}></Column>
      </DataTable>
    </>
  );
};

export default KeysTable;
