import { useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addRoom, getRooms } from "../../services/roomsService"; // Hypothetical service
import FloatingTextForm from "../common/FloatingTextForm";

const RoomsForm = ({ setRooms }: { setRooms: (value: []) => void }) => {
  const [name, setRoomName] = useState("");
  const [type, setRoomType] = useState(1);
  const [floor, setRoomFloor] = useState(1);

  const resetForm = () => {
    setRoomName("");
    setRoomType(1);
    setRoomFloor(1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a room name");
      return;
    }

    const data = {
      name,
      type,
      floor,
    };

    addRoom(data, () => {
      resetForm();
      getRooms(setRooms);
    });
  };

  return (
    <Form onSubmit={onSubmit} className="offer-form">
      <FloatingTextForm label="Room Name" value={name} setValue={setRoomName} />
      <FloatingLabel controlId="formKeyAmount" label="Floor" className="mb-3 offer-form-field">
        <Form.Control
          type="number"
          placeholder="Floor"
          value={floor}
          onChange={(e) => setRoomFloor(Number(e.target.value))}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Room Type" className="mb-3 offer-form-field">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setRoomType(Number(e.target.value));
            console.log(e.target.value);
          }}
        >
          <option value="1">Guest</option>
          <option value="2">Staff</option>
        </Form.Select>
      </FloatingLabel>
      <Button variant="light" type="submit" className="submit-button offer-form-field">
        <p>Add Room</p>
      </Button>{" "}
    </Form>
  );
};

export default RoomsForm;