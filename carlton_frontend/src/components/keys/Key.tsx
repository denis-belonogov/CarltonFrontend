import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getKey, updateKey } from "../../services/keysService";

export default function Key() {
  const [nameEditable, setNameEditable] = useState(false);
  const [brandEditable, setBrandEditable] = useState(false);
  const [quantityEditable, setQuantityEditable] = useState(false);
  const { id } = useParams();
  interface Key {
    id: number;
    name: string;
    brand: string;
    amount: number;
  }
  const [key, setKey] = useState<Key>();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getKey(Number(id), (key) => {
      setKey(key);
      setName(key.name);
      setBrand(key.brand);
      setQuantity(key.amount);
    });
  }, []);

  return (
    <div className="surface-0">
      <div className="font-medium text-3xl text-900 key-info">Key Information</div>
      <ul className="list-none p-0 m-0">
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Key Name</div>
          {nameEditable ? (
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
          <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
            {nameEditable ? (
              <Button
                label="Save"
                icon="pi pi-save"
                className="p-button-text"
                onClick={() => {
                  setNameEditable(false);
                  if (key) {
                    const modified_key = key;
                    modified_key.name = name;
                    setKey(modified_key);
                    updateKey(modified_key, () => {});
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
          <div className="text-500 w-6 md:w-2 font-medium">Brand</div>
          {brandEditable ? (
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
          <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
            {brandEditable ? (
              <Button
                label="Save"
                icon="pi pi-save"
                className="p-button-text"
                onClick={() => {
                  setBrandEditable(false);
                  if (key) {
                    const modified_key = key;
                    modified_key.brand = brand;
                    setKey(modified_key);
                    updateKey(modified_key, () => {});
                  }
                }}
              />
            ) : (
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={() => setBrandEditable(true)}
              />
            )}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Quantity</div>
          {quantityEditable ? (
            <InputNumber
              value={quantity}
              onValueChange={(e) => {
                setQuantity(Number(e.value));
              }}
              showButtons
            />
          ) : (
            <div className="text-900 w-full flex md:w-8 md:flex-order-0 flex-order-1">{quantity}</div>
          )}
          <div className="w-6 md:w-2 flex justify-content-end flex-order-2">
            {quantityEditable ? (
              <Button
                label="Save"
                icon="pi pi-save"
                className="p-button-text"
                onClick={() => {
                  setQuantityEditable(false);
                  if (key) {
                    const modified_key = key;
                    modified_key.amount = quantity;
                    setKey(modified_key);
                    updateKey(modified_key, () => {});
                  }
                }}
              />
            ) : (
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={() => setQuantityEditable(true)}
              />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
