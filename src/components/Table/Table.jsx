import { useEffect, useState } from "react";
import { getUsers } from "../../../api/users";
import { deleteTodo, getTodos } from "../../../api/todos";
import Avatar from "../Avatar/Avatar";
import Box from "../Box/Box";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [deletePending, setDeletePending] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await getUsers();
        const todoList = await getTodos();
        setUsers(userList.data);
        console.log("USERS: ", userList.data);
        setTodos(todoList.data.slice(0, 12));
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const deleteTodoLocal = async (id) => {
    try {
        setDeletePending(true);
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setDeletePending(false);
    } catch (error) {
      console.error("Error occurred while deleting the todo:", error);
      setDeletePending(false);
    }
  };

  const getUserById = (userId) => users.find((user) => user.id === userId);

  return (
    <table className="relative">
        {deletePending && <p className="absolute top-[-45px] flex left-7">Delete is pending...</p>}
      <thead>
        <tr>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3">Image</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3 text-start">Title</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3 text-start">Email</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3 text-start">Address</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3" >Zip Code</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3 text-">Completed</th>
          <th scope="col" className="text-[#343A40] text-sm font-medium border-b border-[#DFDFDF] py-3 ">Delete</th>
        </tr>
      </thead>
      <tbody className="border-spacing-x-5">
      {todos.map((todo) => {
          const user = getUserById(todo.userId);
          return (
            <tr key={todo.id} className="border-b border-[#EAEAEA]">
              <td className="w-[100px] text-[#6C757D] flex justify-center items-center"><Avatar /></td>
              <td className="w-[332px] text-[#6C757D]">{todo.title.slice(0, 30)}</td>
              <td className="w-[236px] text-[#6C757D]">{user?.email || "N/A"}</td>
              <td className="w-[200px] text-[#6C757D]">{user?.address?.street || "N/A"}</td>
              <td className="w-[200px] text-[#6C757D] text-center">{user?.address?.zipcode || "N/A"}</td>
              <td className="w-[135px]"><Box completed={todo.completed ? "Yes" : "No"}/></td>
              <td>
                <button className="text-black hover:underline" onClick={() => deleteTodoLocal(todo.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
