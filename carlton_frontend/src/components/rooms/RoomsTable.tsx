import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { deleteRoom, getRooms } from "../../services/roomsService"; // Hypothetical service

enum RoomType {
  GUEST = "Guest",
  STAFF = "Staff",
}

interface Room {
  id: number;
  name: string;
  type: RoomType;
  floor: number;
}

interface RoomsTableProps {
  rooms: Room[];
  setRooms: (value: []) => void;
}

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, setRooms }) => {
  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>, room: Room) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoom(room.id, () => {
        getRooms(setRooms);
      });
    }
  };

  return (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Room Name</th>
          <th>Floor</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room: Room) => (
          <tr key={room.id}>
            <td>{room.id}</td>
            <td>{room.name}</td>
            <td>{room.floor}</td>
            <td>{room.type}</td>
            <td>
              <button
                onClick={(e) => {
                  onClick(e, room);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RoomsTable;
