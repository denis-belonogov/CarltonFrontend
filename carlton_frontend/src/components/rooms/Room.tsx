import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Chip } from "primereact/chip";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKeys } from "../../services/keysService";
import { addKeyToRoom, getRoom, removeKeyFromRoom, updateRoom } from "../../services/roomsService";
import { Key } from "../keys/Key";

export enum RoomType {
  GUEST = "Guest",
  STAFF = "Staff",
}

const roomTypes = () => {
  return Object.values(RoomType).map((type) => ({
    label: type.toString(),
    value: type,
  }));
};

export function roomColour(room: Room) {
  if (room.type === RoomType.STAFF) {
    return room.dead ? "#020202" : "#dee2e6";
  } else {
    switch (room.floor) {
      case 0:
        return "#dee2e6";
      case 1:
        return "#5438A7";
      case 2:
        return "#D17007";
      case 3:
        return "#B4AC01";
      case 4:
        return "#38B9DB";
      case 5:
        return "#DC5CBD";
    }
  }
}

export function roomStyle(room: Room) {
  if (room.type === RoomType.STAFF) {
    return room.dead ? "room-dead" : "room";
  } else {
    switch (room.floor) {
      case 0:
        return "room";
      case 1:
        return "room-floor-1";
      case 2:
        return "room-floor-2";
      case 3:
        return "room-floor-3";
      case 4:
        return "room-floor-4";
      case 5:
        return "room-floor-5";
    }
  }
}

export interface Room {
  id: number;
  name: string;
  floor: number;
  type: RoomType;
  dead: boolean;
  keys: Key[];
}

function buildLabel(key: Key) {
  return `${key.id}`;
}

export default function RoomPage() {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const { id } = useParams();
  const [keys, setKeys] = useState<Key[]>([]);
  const [room, setRoom] = useState<Room>();
  const [name, setName] = useState("");
  const [floor, setFloor] = useState(0);
  const [type, setType] = useState<RoomType>(RoomType.GUEST);
  const [dead, setDead] = useState(false);

  function findKeyByLable(label: string) {
    return keys.find((key) => {
      return buildLabel(key) === label;
    });
  }

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
      <Button label="Back" icon="pi pi-arrow-left" className="p-button-text" onClick={() => navigate("/rooms")} />
      <div className="surface-0">
        <div className="font-medium text-3xl text-900 key-info">Room Information</div>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Room id</div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{id}</div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Room Name</div>
            {editable ? (
              <InputText
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{name}</div>
            )}
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Floor</div>
            {editable ? (
              <InputNumber
                value={floor}
                showButtons
                onChange={(e) => {
                  setFloor(Number(e.value));
                }}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{floor}</div>
            )}
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Type</div>
            {editable ? (
              <Dropdown
                value={type}
                onChange={(e) => {
                  setType(e.value);
                }}
                options={roomTypes()}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{type}</div>
            )}
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Dead Room</div>

            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              <Checkbox onChange={(e) => setDead(Boolean(e.checked))} checked={dead} disabled={!editable} />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Keys</div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              {room?.keys
                .sort((a, b) => a.id - b.id)
                .map((key: Key) => {
                  return (
                    <Chip
                      key={`${key.name}${key.id}`}
                      label={buildLabel(key)}
                      className="mr-2 chip"
                      onClick={(e) => {
                        if (!editable) navigate(`/key/${key.id}`);
                      }}
                      removable={editable}
                      onRemove={async (e) => {
                        const newKey = findKeyByLable(e.value);
                        if (newKey) {
                          await removeKeyFromRoom(Number(id), newKey.id, () => {});
                          await getRoom(Number(id), (room) => {
                            setRoom(room);
                          });
                        }
                      }}
                    />
                  );
                })}
            </div>
          </li>
          {editable ? (
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Add Keys</div>
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
                <Dropdown
                  value=""
                  onChange={async (e) => {
                    const newKey = findKeyByLable(e.value);
                    if (newKey) {
                      await addKeyToRoom(Number(id), newKey.id, () => {});
                      await getRoom(Number(id), (room) => {
                        setRoom(room);
                      });
                    }
                  }}
                  options={keys
                    .filter((key) => {
                      return room?.keys.findIndex((selKey) => selKey.id === key.id) === -1;
                    })
                    .map((key: Key) => {
                      return buildLabel(key);
                    })}
                  className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
                />
              </div>
            </li>
          ) : null}
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium"></div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"></div>
            <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
              {editable ? (
                <Button
                  label="Save"
                  icon="pi pi-save"
                  className="p-button-text"
                  onClick={() => {
                    setEditable(false);
                    if (room) {
                      const modified_room = room;
                      modified_room.name = name;
                      modified_room.floor = floor;
                      modified_room.type = type;
                      modified_room.dead = dead;
                      setRoom(modified_room);
                      updateRoom(modified_room, () => {});
                    }
                  }}
                />
              ) : (
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditable(true)} />
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
