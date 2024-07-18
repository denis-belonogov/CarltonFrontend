import { faFilePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Table from "react-bootstrap/Table";
import { onDelete } from "../services/keysService";
import "../../styles/KeysList.css";

interface Key {
  id: number;
  name: string;
  brand: string;
  room_name: string;
  amount: number;
}

// Update the component props to include types
interface KeysListProps {
  keys: Key[];
  updateCallback: () => void;
}

const KeysList: React.FC<KeysListProps> = ({ keys, updateCallback }) => {
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>, key: Key) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this key?")) {
      onDelete(key.id, updateCallback);
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
            <th>Room Name</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id}>
              <td>{key.id}</td>
              <td>{key.name}</td>
              <td>{key.brand}</td>
              <td>{key.room_name}</td>
              <td>{key.amount}</td>
              <td>
                <button
                  onClick={() => {
                    //onDelete(key.id);
                  }}
                >
                  <FontAwesomeIcon icon={faFilePen} />
                </button>
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

export default KeysList;
