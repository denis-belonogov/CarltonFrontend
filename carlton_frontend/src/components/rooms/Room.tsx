import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKeys } from "../../services/keysService";
import { getRoom, updateRoom } from "../../services/roomsService";

export enum RoomType {
  GUEST = "Guest",
  STAFF = "Staff",
}

interface Key {
  id: number;
  name: string;
  brand: string;
  amount: number;
}

const roomTypes = () => {
  return Object.values(RoomType).map((type) => ({
    label: type.toString(),
    value: type,
  }));
};

export interface Room {
  id: number;
  name: string;
  floor: number;
  type: RoomType;
  dead: boolean;
  [key: string]: any;
}

export default function RoomPage() {
  const navigate = useNavigate();
  const [nameEditable, setNameEditable] = useState(false);
  const [floorEditable, setFloorEditable] = useState(false);
  const [typeEditable, setTypeEditable] = useState(false);
  const [deadEditable, setDeadEditable] = useState(false);
  const [keysEditable, setKeysEditable] = useState(false);
  const { id } = useParams();
  const [keys, setKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [room, setRoom] = useState<Room>();
  const [name, setName] = useState("");
  const [floor, setFloor] = useState(0);
  const [type, setType] = useState<RoomType>(RoomType.GUEST);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    getRoom(Number(id), (room) => {
      setRoom(room);
      setName(room.name);
      setFloor(room.floor);
      setType(room.type);
      setDead(room.dead);
    });
    getKeys(setKeys);
  }, []);

  return (
    <>
      <Button
        label="Back"
        icon="pi pi-arrow-left"
        className="p-button-text"
        onClick={() => navigate("/rooms")}
      />
      <div className="surface-0">
        <div className="font-medium text-3xl text-900 key-info">
          Room Information
        </div>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Room id</div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              {id}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Room Name</div>
            {nameEditable ? (
              <InputText
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
                {name}
              </div>
            )}
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {nameEditable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setNameEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.name = name;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => setNameEditable(true)}
                />
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Floor</div>
            {floorEditable ? (
              <InputNumber
                value={floor}
                onChange={(e) => {
                  setFloor(Number(e.value));
                }}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
                {floor}
              </div>
            )}
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {floorEditable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setFloorEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.floor = floor;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => setFloorEditable(true)}
                />
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Type</div>
            {typeEditable ? (
              <Dropdown
                value={type}
                onChange={(e) => {
                  setType(e.value);
                }}
                options={roomTypes()}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
                {type}
              </div>
            )}
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {typeEditable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setTypeEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.type = type;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => setTypeEditable(true)}
                />
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Dead Room</div>

            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              <Checkbox
                onChange={(e) => setDead(Boolean(e.checked))}
                checked={dead}
                disabled={!deadEditable}
              />
            </div>
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {deadEditable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setDeadEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.dead = dead;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => setDeadEditable(true)}
                />
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Keys</div>

            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              {keysEditable ? (
                <MultiSelect
                  value={selectedKeys}
                  onChange={(e) => setSelectedKeys(e.value)}
                  options={keys}
                  optionLabel="name"
                  display="chip"
                  placeholder="Select Keys"
                  maxSelectedLabels={10}
                  className="flex keys-select"
                />
              ) : (
                <Chips
                  value={selectedKeys.map((key: Key) => {
                    return key.name;
                  })}
                  disabled
                  className="w-6 md:w-12 flex justify-content-end flex-order-2"
                />
              )}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {keysEditable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setKeysEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.keys = selectedKeys;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => setKeysEditable(true)}
                />
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
