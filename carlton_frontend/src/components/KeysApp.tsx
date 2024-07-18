import { useEffect, useState } from "react";
import KeysForm from "./KeysForm";
import KeysList from "./KeysList";
import { fetchKeys } from "../services/keysService";

export default function KeysApp() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    fetchKeys(setKeys);
  }, []);

  return (
    <main>
      <KeysForm fetchKeys={fetchKeys} />
      <KeysList
        keys={keys}
        updateCallback={() => {
          fetchKeys(setKeys);
        }}
      />
    </main>
  );
}
