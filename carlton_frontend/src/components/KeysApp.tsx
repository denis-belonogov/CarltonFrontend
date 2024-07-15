import React, { useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";
import KeysList from "./KeysList";
import KeysForm from "./KeysForm";

export default function KeysApp() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    const response = await fetch("https:///127.0.0.1:5000/keys");
    const data = await response.json();
    setKeys(data.keys);
  };

  return (
    <>
      <KeysList keys={keys} />
      <KeysForm />
    </>
  );
}
