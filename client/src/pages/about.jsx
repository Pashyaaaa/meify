/* eslint-disable no-unused-vars */
import { redirect } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [name, setName] = useState("");

  return (
    <div className="bg-slate-900 flex justify-center items-center h-screen">
      <Navbar></Navbar>
      <h1 className="text-white text-center">Welcome to About ✨</h1>
    </div>
  );
};

export default Home;
