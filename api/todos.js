import axios from "axios";

export const getTodos = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      console.log("Todos: ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}