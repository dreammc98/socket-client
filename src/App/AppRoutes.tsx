import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "components/Chat";
import { Main } from "components/Main";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
