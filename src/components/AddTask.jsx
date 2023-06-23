import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask({ userId, userToken }) {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  const addTodoHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/task/addTask/${userId}`,
        { task: todo },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { data } = response;
      setTodo("");
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <form className="relative flex w-full" onSubmit={addTodoHandler}>
      <Input
        type="text"
        label="Enter Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="border border-purple-700 focus:border-purple-700 pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={todo ? "purple" : "blue-gray"}
        disabled={!todo}
        className="!absolute right-1 top-1 rounded"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}

export default AddTask;
