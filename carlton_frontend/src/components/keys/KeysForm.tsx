import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../../../styles/KeysForm.css";
import "../../../styles/Offer.css";
import { addKey, getKeys } from "../../services/keysService";
import FloatingTextForm from "../common/FloatingTextForm";

const KeysForm = ({ setKeys }: { setKeys: (value: []) => void }) => {
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
      resetForm();
      getKeys(setKeys);
    });
  };

  return (
    <Form onSubmit={onSubmit} className="offer-form">
      <FloatingTextForm label="Key Name" value={name} setValue={setName} />
      <FloatingTextForm label="Key Brand" value={brand} setValue={setBrand} />
      <FloatingLabel controlId="formKeyAmount" label="Amount of Keys" className="mb-3 offer-form-field">
        <Form.Control
          type="number"
          placeholder="Key name"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </FloatingLabel>
      <Button variant="light" type="submit" className="submit-button offer-form-field">
        <p>Add Key</p>
      </Button>{" "}
    </Form>
  );
};

export default KeysForm;
