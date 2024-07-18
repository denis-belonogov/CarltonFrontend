import { API_URL } from "../constants";

export const onDelete = async (id: number, updateCallback: () => void) => {
  try {
    const options = { method: "DELETE" };
    const response = await fetch("${API_URL}/keys/${id}", options);

    if (response.status === 200) {
      updateCallback();
    } else {
      console.error("Failed to delete");
    }
  } catch (error) {
    alert(error);
  }
};

export const fetchKeys = async (setKeys: (keys: []) => void) => {
  const response = await fetch(`${API_URL}/keys`);
  const data = await response.json();
  setKeys(data.keys);
};

export const addKey = async (keyData: any, callback: () => void) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyData),
    };
    const response = await fetch(`${API_URL}/keys`, options);

    if (response.status === 201) {
      callback();
    } else {
      console.error("Failed to add new key");
    }
  } catch (error) {
    console.error(error);
  }
};
