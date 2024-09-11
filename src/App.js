import "./App.css";
import React, { useContext, useState } from "react";
// import End from "./components/header";
// import Header from "./components/end";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExam from "./components/AddExam";
import OnlineExam from "./components/OnlinExam";
import ExamResult from "./components/ExamResult";
import Exams from "./components/Exams";
// import ExamProvider from "./context/ExamProvider";
import AddCourse from "./components/AddCourse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Exams />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/addexam/:examId?" element={<AddExam />} />
          <Route path="/online-exam/:id" element={<OnlineExam />} />
          <Route path="/exam-result/:id" element={<ExamResult />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;