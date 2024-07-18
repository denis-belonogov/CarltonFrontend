import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
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

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>, key: Key) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this key?")) {
      deleteKey(key.id, () => {
        getKeys(setKeys);
      });
    }
  };

  return (
    <>
      <Table striped bordered hover w-auto className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Key Name</th>
            <th>Brand</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key: Key) => (
            <tr key={key.id}>
              <td>{key.id}</td>
              <td>{key.name}</td>
              <td>{key.brand}</td>
              <td>{key.amount}</td>
              <td>
                <button
                  onClick={(e) => {
                    onClick(e, key);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default KeysTable;
