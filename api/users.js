import axios from "axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRandomAvatar = async () => {
    const randomId = Math.floor(Math.random() * 70);
    return `https://i.pravatar.cc/150?img=${randomId}`;
  };