import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/KeysList.css";
import { deleteKey, getKeys } from "../../services/keysService";
interface Key {
  id: number;
  name: string;
  brand: string;
  amount: number;
}

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
        icon="pi pi-trash"
        rounded
        outlined
        onClick={() => {
          click(data);
        }}
      ></Button>
    );
  };

  const redirectToKey = (key: Key) => {
    navigate(`/key/${key.id}`);
  };

  return (
    <>
      <DataTable
        value={keys}
        stripedRows
        removableSort
        showGridlines
        className="table"
        selectionMode="single"
        onSelectionChange={(e) => redirectToKey(e.value)}
        dataKey="id"
      >
        <Column field="id" header="id" sortable alignHeader={"center"}></Column>
        <Column field="name" header="Key Name" sortable alignHeader={"center"}></Column>
        <Column field="brand" header="Brand" sortable alignHeader={"center"}></Column>
        <Column field="amount" header="Quantity" sortable alignHeader={"center"}></Column>
        <Column field="actions" header="Actions" alignHeader={"center"} body={deleteButton}></Column>
      </DataTable>
    </>
  );
};

export default KeysTable;
