import React, { useEffect, useState } from 'react';
import '../assets/css/exams.css'
import ExamList from '../components/ExamList';
import Pagination from '../components/Pagination'
import Navbar from '../components/Navbar';
import { useExams } from '../exams/useExams';
import { useQuestions } from '../exams/useQuestions';

function Exams() {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [previousExams, setPreviousExams] = useState([])
  // const [allExams, setAllExams] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [examsPerPage] = useState(5);


  const { exams, isLoading, error } = useExams();
  const { questions } = useQuestions()

  useEffect(() => {
    if (exams && questions) {
      const currentDate = new Date();

      const previous = exams.filter(exam => {
        const examDate = new Date(exam.date);
        const hasScore = questions.some(q => q.exams && q.exams.id === exam.id && q.score !== null);
        return examDate < currentDate || hasScore;
      }).map(exam => {
        const examQuestion = questions.find(q => q.exams.id === exam.id);
        return {
          ...exam,
          isFinished: true,
          score: examQuestion ? examQuestion.score : null,
          resultId: examQuestion ? examQuestion.id : null
        }
      })

      const upcoming = exams.filter(exam => {
        const examDate = new Date(exam.date);
        return examDate >= currentDate && !previous.some(prevExam => prevExam.id === exam.id);
      }).map(exam => ({
        ...exam,
        isFinished: false,
      }))


      setUpcomingExams(upcoming);
      setPreviousExams(previous);
      console.log('Upcoming Exams:', upcoming);
      console.log('Previous Exams:', previous);
    } else {
      console.log('No exams found');
    }

  }, [exams, questions]);



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  // get current page
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentUpcomingExams = upcomingExams.slice(indexOfFirstExam, indexOfLastExam)
  const currentPreviousExams = previousExams.slice(indexOfFirstExam, indexOfLastExam)
  // const currentExams = allExams.slice(indexOfFirstExam, indexOfLastExam);
 
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="main-bg">
      <div className='container'>
        <Navbar />
        <div className="exam-section">
          <div className="section-title">
            <h4>Exams</h4>
            <p>{new Date().toDateString()} </p>
          </div>
          <ExamList title={"Upcoming Exams"} exams={currentUpcomingExams} />
          <ExamList title={"Previous Exams"} exams={currentPreviousExams} />
        </div>
        <Pagination 
            examsPerPage={examsPerPage}
            totalExams={upcomingExams.length}
            paginate={paginate}
            currentPage={currentPage}
          />
      </div>
    </div >
  );
}
export default Exams;