import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Main = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    if (!name || !email) {
      toast.error("Please enter both your name and email!");
      return;
    }

    try {
      const response = await axios.post(
        "https://outlookclone-production.up.railway.app/api/v1/user",
        {
          name,
          outemail: `${email}@outlook.com`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 201) {
        toast.success("Account created successfully!");
        Cookies.set('user', response.data.token, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
        navigate("/dashboard")
      } else {
        throw new Error("Failed to create account");
      }
    }catch (error) {
      toast.error("Error creating account. Please try again.");
    }
  };

  return (
    <div className="bg-[#1d1d1d] min-h-screen flex flex-col items-center">
      <div className="h-[200px] flex justify-center items-center">
        <h1 className="text-center text-4xl sm:text-5xl text-white font-bold">
          outLook
        </h1>
      </div>
      <div className="bg-black rounded-3xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] p-3 m-auto flex flex-col sm:flex-row gap-6 sm:gap-10">
        <input
          name="text"
          className="py-3 px-5 rounded-3xl w-full sm:w-[50%] outline-none"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-2 items-center rounded-3xl w-full sm:w-[50%] bg-white px-5">
          <input
            name="text"
            className="py-3 outline-none w-full"
            placeholder="Create your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xl mr-2">\@outlook.com</p>
        </div>
      </div>
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] m-auto flex justify-center sm:justify-end py-4">
        <button
          className="bg-white py-3 sm:py-2 mt-4 w-full sm:w-[200px] font-semibold shadow-2xl text-xl rounded-3xl"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Main;
