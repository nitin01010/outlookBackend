import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tabStatus, setTabStatus] = useState("Unread");
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  // Fetch emails based on the tab status
  const fetchEmails = async () => {
    try {
      const response = await axios.get(`https://outlookclone-production.up.railway.app/api/v1/emails?status=${tabStatus}`);
      setData(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails.");
    }
  };

  // Update email status to "Read"
  const updateStatusToRead = async (emailId) => {
    try {
      const response = await axios.post("https://outlookclone-production.up.railway.app/api/v1/emails/updateStatus", {
        id: emailId,
        status: "Read", // Update status to 'Read'
      });

      if (response.data.message === 'Email status updated successfully.') {
        toast.success("Email marked as read!");
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  
  const markAsFavorite = async (emailId) => {
    try {
      const response = await axios.post("https://outlookclone-production.up.railway.app/api/v1/emails/updateStatus", {
        id: emailId,
        status: "Favorites", 
      });

      if (response.data.message === 'Email status updated successfully.') {
        toast.success("Email marked as favorite!");
      } else {
        toast.error("Failed to mark as favorite.");
      }
    } catch (error) {
      console.error("Error marking as favorite:", error);
      toast.error("Failed to mark as favorite.");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [tabStatus]);

  return (
    <div className="bg-[#F4F5F9] min-h-screen">
      <div className="w-[100%] md:w-[95%] m-auto flex">
        <div className="flex-1 p-4 ">
          <div className="flex font-semibold  mt-12 ">
            <p>Filter By:</p>
            <div className="flex text-center px-10  gap-5">
              {["Unread", "Read", "Favorites"].map((status) => (
                <p
                  key={status}
                  className={`hover:bg-[#E1E4EA] rounded-3xl  h-[28px] cursor-pointer hover:border hover:border-[#CFD2DC] w-[80px] ${tabStatus === status ? "bg-[#E1E4EA]" : ""}`}
                  onClick={() => setTabStatus(status)}
                >
                  {status}
                </p>
              ))}
              <p
                className="hover:bg-[#E1E4EA] rounded-3xl h-[28px] cursor-pointer hover:border hover:border-[#CFD2DC] w-[80px]"
                onClick={() => navigate("/sendEmail")}
              >
                Send
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {data?.map((email, index) => {
              const isSelected = activeCard === index;
              return (
                <div
                  key={index}
                  className={`bg-white mt-5 hover:bg-[#e5e5e5] rounded-[8px] p-3 flex gap-10 cursor-pointer ${isSelected ? "border-2 border-[#e54065]" : ""}`}
                  onClick={() => {
                    if (email.status === "Unread") {
                      updateStatusToRead(email._id); // Update the email status to "Read"
                    }
                    setActiveCard(activeCard === index ? null : index); // Toggle card selection
                  }}
                >
                  {/* Show first letter of account owner or profile image */}
                  <div className="ml-8 mt-4 w-[80px] h-[70px] flex items-center justify-center rounded-full bg-[#e54065] text-white text-2xl font-bold">
                    {email.from ? email.from[0].toUpperCase() : ""}
                  </div>

                  <div className="w-full">
                    <div className="flex gap-2">
                      <p className="text-[#636363]">From:</p>
                      <p className="font-semibold">{email.from}</p>
                    </div>
                    <div className="flex gap-2 py-2">
                      <p className="text-[#636363]">Subject:</p>
                      <p className="font-semibold">{email.subject}</p>
                    </div>
                    <p className="text-[#636363]">{email.description}</p>
                    <div className="flex gap-10 py-2">
                      <p className="text-[#636363]">{new Date(email.createdAt).toLocaleString()}</p>
                      <p className="font-semibold text-[#e54065]">{email.status}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Card Details */}
        {activeCard !== null && data[activeCard] && (
          <div className="w-[60%] mt-16 hidden md:flex flex-col bg-white rounded-lg p-4 ml-4">
            <div className="flex gap-5">
              <div className="w-[60px] h-[55px] flex items-center justify-center rounded-full bg-[#e54065] text-white text-xl font-bold">
                {data[activeCard].from ? data[activeCard].from[0].toUpperCase() : ""}
              </div>
              <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold">{data[activeCard].subject}</h1>
                <button
                  className="bg-[#e54065] text-white w-[140px] text-center h-[40px] py-2 rounded-3xl"
                  onClick={() => markAsFavorite(data[activeCard]._id)}
                >
                  Mark as favorite
                </button>
              </div>
            </div>
            <div className="ml-[75px]">
              <p className="text-[#636363] mb-3">{new Date(data[activeCard].createdAt).toLocaleString()}</p>
            </div>
            <div className="ml-[75px]">
              <p className=" text-[#636363]">{data[activeCard].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
