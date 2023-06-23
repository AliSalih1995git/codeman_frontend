import { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";
import RoundedProgressBar from "./RoundedProgressBar";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Accordian({ userId, userToken }) {
  const [open, setOpen] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/task/getTask/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setTasks(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleCheckboxChange = async (taskId, isChecked) => {
    console.log(taskId, isChecked, "check");
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, checked: isChecked };
      }
      return task;
    });

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/task/updateTask/${taskId}`,
        { checked: isChecked },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const batchSize = 5;
  const groupedTasks = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const checkedTasks = batch.filter((task) => task.checked);
    const updatedPercentage = (checkedTasks.length / 5) * 100;

    groupedTasks.push({ tasks: batch, percentage: updatedPercentage });
  }
  // console.log(groupedTasks);
  // console.log(tasks, "All tasks");
  return (
    <Fragment>
      {groupedTasks.map((group, index) => (
        <Accordion
          key={index}
          open={open === index + 1}
          icon={<Icon id={index + 1} open={open} />}
        >
          <AccordionHeader onClick={() => handleOpen(index + 1)}>
            MY TASKS
          </AccordionHeader>
          <div className="flex">
            <div className="flex-grow">
              {group.tasks.map((item) => (
                <AccordionBody
                  key={item._id}
                  className="pl-8 flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(item._id, e.target.checked)
                    }
                    className={`h-4 w-4 rounded border-gray-300 focus:ring-purple-400 focus:border-purple-400 mr-2 ${
                      item.checked ? "text-purple-700" : ""
                    }`}
                  />
                  <span>{item.task}</span>
                </AccordionBody>
              ))}
            </div>
            {open === index + 1 && group.tasks.length > 0 && (
              <div className="ml-8 mt-4 w-[160px]">
                <RoundedProgressBar percentage={group.percentage} />
              </div>
            )}
          </div>
        </Accordion>
      ))}
    </Fragment>
  );
}
