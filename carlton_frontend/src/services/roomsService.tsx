import { API_URL } from "../constants";

export const getRooms = async (callback: (rooms: []) => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    callback(data.rooms);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getRoom = async (id: number, callback: (room: any) => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${id}`);
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const addRoom = async (roomData: any, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    if (response.ok) {
      callback();
    } else {
      alert("Failed to submit the form"); //TODO: response.data.message
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const deleteRoom = async (id: number, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/delete/${id}`, {
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

export const updateRoom = async (roomData: any, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/update/${roomData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
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

export const addKeyToRoom = async (roomId: number, keyId: number, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/update/${roomId}/add_key/${keyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      callback();
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const removeKeyFromRoom = async (roomId: number, keyId: number, callback: () => void) => {
  try {
    const response = await fetch(`${API_URL}/rooms/update/${roomId}/remove_key/${keyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
