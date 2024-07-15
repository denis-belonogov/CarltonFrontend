import React from "react";

// Define a TypeScript interface for the key object
interface Key {
  id: number;
  name: string;
  amount: number;
  holders: string[];
}

// Update the component props to include types
interface KeysListProps {
  keys: Key[];
}

const KeysList: React.FC<KeysListProps> = ({ keys }) => {
  /*
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };
*/
  return (
    <div>
      <h2>Keys</h2>
      <table className="keys">
        <thead>
          <tr>
            <th>id</th>
            <th>Key Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id}>
              <td>{key.id}</td>
              <td>{key.name}</td>
              <td>{key.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeysList;
