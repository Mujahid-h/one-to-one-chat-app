import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] bg-gray-400 rounded-lg overflow-hidden shadow-md  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
