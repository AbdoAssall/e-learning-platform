/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/exams.css'
import ExamList from '../components/ExamList';
import Pagination from '../components/Pagination'
import Navbar from '../components/Navbar';
import { ExamContext } from '../context/ExamProvider';

function Exams() {
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
  const { examData, setExamData } = useContext(ExamContext)
  // const courseKey = Object.keys(examData).filter(key => examData[key]);
  // const currentExam = examData[courseKey]


  // const [upcomingExams, setUpcomingExams] = useState([]);
  // const [previousExams, setPreviousExams] = useState([])

  // const courseKey = Object.keys(examData).filter(key => examData[key]);
  // const currentExam = examData[courseKey]

  // useEffect(() => {
   
  //   if (examData && examData.date) { 
  //     const currentDate = new Date();
  //     const exams = [examData];

  //     const upcoming = exams.filter(exam => new Date(exam.date) >= currentDate);
  //     const previous = exams.filter(exam => new Date(exam.date) < currentDate);

  //     setUpcomingExams(upcoming);
  //     setPreviousExams(previous);
  //   }
  // }, [setExamData]);

  console.log('Exam Data:', examData);
  //console.log('Exam Data:', currentExam);
  
  //  upcomingExams = [
  // {
  //   date: examData.date,
  //   time: examData.time,
  //   courseName: examData.courseName,
  //   level: examData.level,
  //   instructor: 'Mohammed Nour',
  //   isUpcoming: true,
  // }
  // ]
  // const [currentPage, setCurrentPage] = useState(1);



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
        <Navbar />
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
export default Exams;