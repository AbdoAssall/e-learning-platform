/* eslint-disable no-unused-vars */
import { React, useContext, useState, useEffect } from 'react';
import '../assets/css/onlineexam.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import CodeImage from '../assets/images/code.webp'
import { ExamContext } from '../context/ExamProvider';
import { db } from '../db';

const OnlineExam = () => {
    const { examData, setExamData, loadExamDataFromDB } = useContext(ExamContext);
    const [currentExam, setCurrentExam] = useState(null); // To store the current exam data
    const [loading, setLoading] = useState(true) // Loading state

    // useEffect(() => {
    //     const courseKey = Object.keys(examData).find(key => examData[key]);
    //     if (courseKey) {
    //         loadExamDataFromDB(courseKey);  // Load data from IndexedDB
    //     }
    // }, [examData.course]);

    useEffect(() => {
        const fetchExamData = async () => {
            setLoading(true);
            const courseId = examData.courseId  // Get the courseId from context or other logic
            const loadExam = await loadExamDataFromDB(courseId)  // Load the exam data from the database
            console.log(loadExam)

            if (loadExam) {
                setCurrentExam(loadExam)  // Set the loaded data into state
            } else {
                console.log('No exam data found for this course.')
            }
            setLoading(false); // Stop loading after data is fetched
        };
        
        fetchExamData();
    }, [examData.courseId, loadExamDataFromDB])
    // console.log(currentExam)

    const [durationNumbers, setDurationNumbers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60)
    const [score, setScore] = useState(0)
    const [answeredQuestions, setAnsweredQuestions] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)


    useEffect(() => {
        if (timeLeft === 0) {
            handelSubmit();
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const handelSubmit = () => { }
    return (
        <div className="main-bg">
            <div className="container">
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Online Exam</h4>
                        <p>6th June 2023</p>
                    </div>
                    <div >
                        <div className='online-exam d-flex justify-content-between'>
                            <div className='title-info'>
                                <h4 className='text-capitalize'>{examData.courseName}</h4>
                                <p>{examData.level || 'N/A'}, {examData.fullMark} Markes</p>
                                <p><span>Instructor: </span> Tariq Ali</p>
                            </div>
                            <div className='exam-info-time'>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><IoCalendarOutline className='icon' /> Date</p>
                                        <p>{examData.date}</p>
                                    </div>
                                </div>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><MdAccessTime className='icon' /> Time</p>
                                        <p>{examData.time}</p>
                                    </div>
                                </div>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><CiAlarmOn className='icon' /> Duration</p>
                                        <p>{examData.duration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='exam-timer mb-5'>
                            <p className='mb-1 text-end'>{timeLeft}</p>
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className='exam-from mb-2'>
                            {examData?.questions?.length > 0 ? (
                                examData.questions.map((question, index) => (
                                    <div key={index} className="my-5">
                                        <div className='exam-item card'>
                                            <div className="card-body p-0">
                                                <div className="exam-row">
                                                    <p>Quettion {index + 1}</p>
                                                    <h5>{question.questionText || 'No question text'}</h5>
                                                    {question.image && (
                                                        <div className='img-code'>
                                                            <img src={question.image} alt='Code' />
                                                        </div>
                                                    )}
                                                    <div className="options">
                                                        {question.incorrectOptions.map((option, i) => (
                                                            <label key={i} className='option'>
                                                                <input
                                                                    type='radio'
                                                                    name={`option${index}`}
                                                                    value={option}
                                                                />
                                                                <span>{String.fromCharCode(65 + i)} : {option}</span>
                                                            </label>
                                                        ))}
                                                        <label className='option'>
                                                            <input
                                                                type='radio'
                                                                name='option'
                                                                value={question.correctOptions}
                                                            />
                                                            <span>{String.fromCharCode(67)} : {question.correctOption}</span>
                                                        </label>
                                                        <span className="selection" />
                                                    </div>
                                                    <p className='text-end'>{question.mark} Markes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (<p>No questions available for this course.</p>)
                            }
                        </div>
                        <div className='exam-from-btns mb-3'>
                            <button className='btn exam-btn text-uppercase'>Cancel</button>
                            <button className='btn exam-btn text-uppercase'>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OnlineExam;