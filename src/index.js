import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.js';
import AddExam from './components/AddExam';
import OnlineExam from './components/OnlinExam';
import ExamResult from './components/ExamResult';
import Exams from './components/Exams';
import App from './App';
import ExamProvider from './context/ExamProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  // <ExamProvider>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Exams />} />
  //       <Route path="/exams" element={<Exams />} />
  //       <Route path="/add/exam" element={<AddExam />} />
  //       <Route path="/online/exam" element={<OnlineExam />} />
  //       <Route path="/exam/result" element={<ExamResult />} />
  //     </Routes>
  //   </BrowserRouter>
  // </ExamProvider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);