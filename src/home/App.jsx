import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../components/ui/main";
import ErrorPage from "../components/ui/error";
import Dashboard from "../components/privateRoute/dashboard";
import SendEmail from "../components/privateRoute/sendEmail";
import ProtuctedRoute from "../../ProtuctedRoute";
import PublicRoute from "../../publickRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtuctedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendEmail" element={<SendEmail />} />
        </Route>
        <Route element={<PublicRoute />} >
          <Route path="/" element={<Main />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
