import { useState } from "react";
import KeysForm from "./KeysForm";
import KeysTable from "./KeysTable";

export default function KeysApp() {
  const [keys, setKeys] = useState([]);
  return (
    <main>
      <KeysForm setKeys={setKeys} />
      <KeysTable keys={keys} setKeys={setKeys} />
    </main>
  );
}
