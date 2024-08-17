import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { TreeSelect } from "primereact/treeselect";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKey, updateKey } from "../../services/keysService";
import { addKeyToRoom, getRooms, removeKeyFromRoom } from "../../services/roomsService";
import { Room, roomColour } from "../rooms/Room";

export interface Key {
  id: number;
  name: string;
  brand: string;
  amount: number;
  rooms: Room[];
}

export default function Key() {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const { id } = useParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [key, setKey] = useState<Key>();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);

  function isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }
  useEffect(() => {
    getKey(Number(id), (key) => {
      setKey(key);
      setName(key.name);
      setBrand(key.brand);
      setQuantity(key.amount);
    });
    getRooms(setRooms);
  }, []);

  const nodes: any[] = [0, 1, 2, 3, 4, 5].map((floor) => {
    return {
      key: `Floor ${floor}`,
      label: `Floor ${floor}`,
      children: [
        {
          key: `${floor}-0`,
          label: "Guest Rooms",
          children: rooms
            .filter((room) => {
              return key?.rooms.findIndex((selRoom) => selRoom.id === room.id) === -1;
            })
            .filter((room) => room.type === "Guest" && room.floor === floor)
            .map((room) => ({ key: room.id.toString(), label: room.name, data: room.name })),
        },
        {
          key: `${floor}-1`,
          label: "Staff Rooms",
          children: rooms
            .filter((room) => {
              return key?.rooms.findIndex((selRoom) => selRoom.id === room.id) === -1;
            })
            .filter((room) => room.type === "Staff" && room.floor === floor)
            .map((room) => ({ key: room.id.toString(), label: room.name, data: room.name })),
        },
      ],
    };
  });

  return (
    <>
      <Button label="Back" icon="pi pi-arrow-left" className="p-button-text" onClick={() => navigate("/keys")} />
      <div className="surface-0">
        <div className="font-medium text-3xl text-900 key-info">Key Information</div>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Key id</div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{id}</div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Key Name</div>
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
            <div className="text-500 w-6 md:w-2 font-medium">Brand</div>
            {editable ? (
              <InputText
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{brand}</div>
            )}
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Quantity</div>
            {editable ? (
              <InputNumber
                value={quantity}
                onValueChange={(e) => {
                  setQuantity(Number(e.value));
                }}
                showButtons
                className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
              />
            ) : (
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{quantity}</div>
            )}
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Rooms</div>
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
              {key?.rooms
                .sort((a, b) => a.id - b.id)
                .map((room: Room) => {
                  return (
                    <Chip
                      key={`${room.name}${room.id}`}
                      label={room.name}
                      className="mr-2 chip"
                      style={{ backgroundColor: roomColour(room) }}
                      onClick={(e) => {
                        if (!editable) navigate(`/room/${room.id}`);
                      }}
                      removable={editable}
                      onRemove={async (e) => {
                        const newRoom = rooms.find((room: Room) => room.name === e.value);
                        if (newRoom) {
                          await removeKeyFromRoom(newRoom.id, Number(id), () => {});
                          await getKey(Number(id), (key) => {
                            setKey(key);
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
              <div className="text-500 w-6 md:w-2 font-medium">Add Rooms</div>
              <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">
                <TreeSelect
                  filter
                  value=""
                  onNodeSelect={(e) => {
                    e.node.expanded = !e.node.expanded;
                  }}
                  onNodeCollapse={(e) => {
                    e.node.expanded = false;
                  }}
                  onChange={async (e) => {
                    console.log(e.value);
                    if (!isNumeric(e.value)) return;
                    await addKeyToRoom(Number(e.value), Number(id), () => {});
                    await getKey(Number(id), (key) => {
                      setKey(key);
                    });
                  }}
                  options={nodes}
                  className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1"
                  placeholder="Select Item"
                ></TreeSelect>
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
                    if (key) {
                      const modified_key = key;
                      modified_key.name = name;
                      modified_key.brand = brand;
                      modified_key.amount = quantity;
                      setKey(modified_key);
                      updateKey(modified_key, () => {});
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
