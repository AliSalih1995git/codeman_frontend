import React from "react";
import AddTask from "./AddTask";
import Accordian from "./Accordian";

function Home() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const id = user.others._id;
  const token = user.token;
  return (
    <>
      <div className="flex flex-col justify-between  min-h-screen">
        <div className="mx-auto w-1/2 py-8">
          <AddTask usetId={id} userToken={token} />
        </div>
        <div className="mx-auto w-1/2 py-8">
          <Accordian usetId={id} userToken={token} />
        </div>
        <footer className="flex items-center justify-center">
          <p className="text-center mb-4">Footer</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
