import { useState } from "react";

const KeysForm = ({}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a key name");
      return;
    }

    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    const data = {
      name,
      amount,
      holders: [],
    };
    const url = "https:///127.0.0.1:5000/keys";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Key Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button type="submit">Add Key</button>
    </form>
  );
};

export default KeysForm;
