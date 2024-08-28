/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React from 'react';
import './App.css'
import ExamList from './components/ExamList';
import Pagination from './components/Pagination'
import Navbar from './components/Navbar';

function App() {
  const upcomingExams = [
    {
      date: 'Wednesday, June 7th',
      time: '12:30 PM',
      title: 'Introduction to Data Analysis',
      instructor: 'Mohammed Nour',
      level: 'LEV.1',
      isUpcoming: true,
    },
  ];

  const previousExams = [
    {
      date: 'Saturday, June 3rd',
      time: '12:30 PM',
      title: 'System Analysis and Design',
      instructor: 'Sara Ahmed',
      level: 'LEV.1',
      score: '99/100',
      isUpcoming: false,
    },
    {
      date: 'Saturday, June 3rd',
      time: '12:30 PM',
      title: 'Introduction to Web Development',
      instructor: 'Alaa Sameer',
      level: 'LEV.1',
      score: '99/100',
      isUpcoming: false,
    },
    {
      date: 'Saturday, June 3rd',
      time: '12:30 PM',
      title: 'Introduction to Web Development',
      instructor: 'Alaa Sameer',
      level: 'LEV.1',
      score: '99/100',
    },
  ];
  return (
    <div className="main-bg">
      <div className='container'>
      <Navbar/>
        <div className="exam-section">
          <div className="section-title">
            <h4>Exams</h4>
            <p>6th June 2023</p>
          </div>
          <ExamList title={"Upcoming Exams"} exams={upcomingExams} />
          <ExamList title={"Previous Exams"} exams={previousExams} />
        </div>
        <Pagination />
      </div>
    </div >
  );
}
export default App;
