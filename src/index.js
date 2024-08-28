import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import AddExam from './components/AddExam';
import OnlineExam from './components/OnlinExam';
import ExamResult from './components/ExamResult';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add/exam" element={<AddExam />} />
      <Route path="/online/exam" element={<OnlineExam />} />
      <Route path="/exam/result" element={<ExamResult />} />
    </Routes>
  </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

reportWebVitals();
