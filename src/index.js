import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';

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