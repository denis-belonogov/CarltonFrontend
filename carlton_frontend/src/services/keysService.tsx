import { API_URL } from "../constants";

export const getKeys = async (callback: (keys: []) => void) => {
  const response = await fetch(`${API_URL}/keys`);
  const data = await response.json();
  callback(data.keys);
};

export const getKey = async (id: number, callback: (key: any) => void) => {
  try {
    const response = await fetch(`${API_URL}/keys/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the key");
    }
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("There was a problem fetching the key:", error);
    alert(error);
  }
};

export const addKey = async (keyData: any, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/keys/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyData),
    });

    if (response.ok) {
      callback();
    } else {
      alert("Failed to submit the form");
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const deleteKey = async (id: number, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/keys/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      callback();
    } else {
      console.error("Failed to delete");
    }
  } catch (error) {
    console.error("There was a problem with the delete operation:", error);
    alert(error);
  }
};

export const updateKey = async (keyData: any, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/keys/update/${keyData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyData),
    });

    if (response.ok) {
      callback();
    } else {
      alert("Failed to submit the form");
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};
