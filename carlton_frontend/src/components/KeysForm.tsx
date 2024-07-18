import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addKey } from "../services/keysService";
import FloatingTextForm from "./common/FloatingTextForm";

const KeysForm = ({ fetchKeys }: { fetchKeys: any }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [amount, setAmount] = useState(0);

  const resetForm = () => {
    setName("");
    setBrand("");
    setAmount(0);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a key name");
      return;
    }

    if (!amount) {
      alert("Please enter an amount"); // TODO: Toast
      return;
    }

    const data = {
      name,
      brand,
      amount,
    };

    addKey(data, () => {
      fetchKeys();
      resetForm();
    });
  };

  return (
    <Form onSubmit={onSubmit} className="add-key-form">
      <FloatingTextForm label="Key Name" value={name} setValue={setName} />
      <FloatingTextForm label="Key Brand" value={brand} setValue={setBrand} />
      <FloatingLabel controlId="formKeyAmount" label="Amount of Keys" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Key name"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </FloatingLabel>
      <Button type="submit" className="keys-button">
        Add Key
      </Button>
    </Form>
  );
};

export default KeysForm;
