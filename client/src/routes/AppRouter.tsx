import React from "react";
import { UseAppSelector } from "../logic/redux/redux-hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import ForgotPassword from "../pages/auth/forgot_password/ForgotPassword";
import NewPassword from "../pages/auth/forgot_password/NewPassword";
import GeneratePassword from "../pages/home/generatePass/GeneratePassword";
import Home from "../pages/home/dashboard/Home";
import Settings from "../pages/home/settings/Settings";
import Notes from "../pages/home/notes/Notes";
import Health from "../pages/home/health/Health";
import LoadingPage from "../pages/common/LoadingPage";
import Menu from "../components/meniu/Menu";

const AppRouter = () => {
  const isLogged = UseAppSelector((state) => state.auth.isLogged);
  const isLoading = UseAppSelector((state) => state.auth.isLoading);

  return (
    <BrowserRouter>
      {isLogged && !isLoading && <Menu />}
      <Routes>
        {isLoading && <Route path="/loading" element={<LoadingPage />} />}
        {!isLogged && !isLoading ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Signup />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/NewPassword" element={<NewPassword />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/GeneratePassword" element={<GeneratePassword />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Notes" element={<Notes />} />
            <Route path="/Health" element={<Health />} />
            <Route path="/NewPassword" element={<NewPassword />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
