import { useState } from "react";
import RoomsForm from "./RoomsForm";
import RoomsTable from "./RoomsTable";

export default function RoomsApp() {
  const [rooms, setRooms] = useState([]);
  return (
    <main>
      <RoomsForm setRooms={setRooms} />
      <RoomsTable rooms={rooms} setRooms={setRooms} />
    </main>
  );
}
