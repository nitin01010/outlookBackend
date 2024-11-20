import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SendEmail = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (!from || !subject || !description) {
      toast.error("Please fill in all fields before sending!");
      return;
    }

    try {
      const response = await axios.post("https://outlookclone-production.up.railway.app/api/v1/emails", {
        from:`${from}@outlook.com`,
        subject,
        description,
      });

      // If email is sent successfully
      if (response.status === 201) {
        navigate("/dashboard");
        toast.success("Email sent successfully!");
        // Clear the form after successful submission
        setFrom("");
        setSubject("");
        setDescription("");
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      toast.error("Error sending email. Please try again.");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="bg-[#1d1d1d] min-h-screen flex flex-col items-center p-6">
      <div className="h-[100px] flex justify-center items-center">
        <h1 className="text-center text-4xl sm:text-5xl text-white font-bold">
          Outlook Email
        </h1>
      </div>
      <div className="bg-black rounded-3xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] p-6 m-auto flex flex-col gap-6">
        <input
          name="from"
          className="py-3 px-5 rounded-3xl w-full outline-none"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          name="subject"
          className="py-3 px-5 rounded-3xl w-full outline-none"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          name="description"
          className="py-3 px-5 rounded-3xl w-full outline-none resize-none h-32"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] m-auto flex justify-center py-4">
        <button
          className="bg-white py-3 sm:py-2 mt-4 w-full sm:w-[200px] font-semibold shadow-2xl text-xl rounded-3xl"
          onClick={handleSendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
