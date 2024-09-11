/* eslint-disable no-unused-vars */
import { React, useContext, useState, useEffect, useRef } from 'react';
import '../assets/css/onlineexam.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import CodeImage from '../assets/images/code.webp'
import { ExamContext } from '../context/ExamProvider';
// import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { getExams } from '../services/apiExams';
import { getQuestions, updateQuestionResult } from '../services/apiQuestions';
import supabase from '../services/supabase';
import { getCurrentUser, updateCurrentUser } from '../services/apiAuth';

const OnlineExam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isReviewMode = queryParams.get('mode' === 'review');
    const resultId = queryParams.get('resultId');

    const [exam, setExam] = useState()
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});

    const [timeLeft, setTimeLeft] = useState(60 * 60)
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    // const [showAlart, setShowAlart] = useState(true)

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                setIsLoading(true);

                // const currentUser = await getCurrentUser();
                // setUser(currentUser)

                const examResponse = await getExams();
                const selectedExam = examResponse.data.find(e => e.id === parseInt(id));


                if (!selectedExam) {
                    throw new Error('Exam not found');
                }
                setExam(selectedExam);

                const questionsResponse = await getQuestions(id);
                const selectedQuestion = questionsResponse.data.filter(e => e.exam_id === parseInt(id))

                setQuestions(selectedQuestion);

                // if (currentUser && currentUser.user_metadata && currentUser.user_metadata.exam_answers) {
                //     setUserAnswers(currentUser.user_metadata.exam_answers[id] || {});
                // }

                // if (isReviewMode && resultId) {
                //     const { data: resultData, error: resultError } = await supabase
                //         .from('questions')
                //         .select('*')
                //         .eq('id', resultId)
                //         .single();

                //     if (resultError) throw resultError;
                //     setUserAnswers(resultData.user_answers || {});
                // }

            } catch (error) {
                setError(error.message || 'Failed to load exam data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExamData();
    }, [id, isReviewMode, resultId]);

    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':'); // تقسيم الوقت إلى ساعات ودقائق
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        // تحويل الوقت إلى تنسيق 12 ساعة باستخدام toLocaleTimeString
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };
    // useEffect(() => {
    //     const notificationTimer = setTimeout(() => {
    //         setShowAlart(false)
    //     }, 7000)
    //     return () => clearTimeout(notificationTimer)
    // }, [])

    useEffect(() => {
        if (timeLeft === 0) {
            handelSubmit();
        }
            const timer = setInterval(() => {
                setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
            }, 1000)
            return () => clearInterval(timer)

    }, [timeLeft])
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        const totalDurationInSeconds = 60 * 60;
        return (timeLeft / totalDurationInSeconds) * 100;
    };

    const handleAnswer = (questionIndex, isCorrect) => {
        // if (!isReviewMode) {
        //     setUserAnswers(prev => ({
        //         ...prev,
        //         [questionId]: answer
        //     }))
        // }
        setAnsweredQuestions(prev => prev + 1);
        if (isCorrect) {
            setScore(prevScore => prevScore + questions[questionIndex].mark)
            setCorrectAnswers(prev => prev + 1)
        } else {
            setWrongAnswers(prev => prev + 1)
        }

        // Update the question's result in the database
        //  updateQuestionResult(questions[questionIndex].id, {
        //     score: isCorrect ? questions[questionIndex].mark : 0,
        //     answered: 1,
        //     correct: isCorrect ? 1 : 0,
        //     timeSpent: parseInt(questions[questionIndex].duration)  - timeLeft - 2,
        // });
    };

    const handelSubmit = async (e) => {
        if (e && e.preventDefault()) {
            e.preventDefault();
        }

        if (isReviewMode) {
            navigate(`/exam-result/${resultId}`);
            return;
        }
        // Calculate result
        const unansweredQuestions = questions.length - answeredQuestions

        try {
            console.log('Preparing to save exam result...');
            console.log('Current state:', {
                id,
                exam,
                score,
                questions: questions.length,
                answeredQuestions,
                correctAnswers,
                wrongAnswers,
                timeLeft,
            });

            // Save exam result
            const examResult = {
                exam_id: parseInt(id),
                score: score,
                total_questions: questions.length,
                answered: answeredQuestions,
                correct: correctAnswers,
                wrong_answers: wrongAnswers,
                unanswared_questions: unansweredQuestions,
                timeSpent: parseInt(exam.duration) - timeLeft - 2,
            };

            // Check for any undefined values
            for (const [key, value] of Object.entries(examResult)) {
                if (value === undefined) {
                    throw new Error(`${key} is undefined`);
                }
            }

            const { data, error } = await supabase
                .from('questions')
                .update(examResult)
                .eq("exam_id", parseInt(id))
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            if (!data || data.length === 0) {
                throw new Error('No data returned from insert operation');
            }

            navigate(`/exam-result/${data[0].id}`);

        } catch (error) {
            console.error('Detailed error:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            alert(`Failed to save exam result. Error: ${error.message}`);
        }
    };



    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading exam data</div>;
    if (!exam) return <div>Exam not found</div>;
    if (!questions) return <div>Question not found</div>;


    return (
        <div className="main-bg">
            <div className="container">
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Online Exam</h4>
                        <p> {new Date().toDateString()} </p>
                    </div>
                    <div >
                        <div className='online-exam d-flex justify-content-between'>
                            <div className='title-info'>
                                <h4 className='text-capitalize'>{exam.courses.title}</h4>
                                <p>{`lev.${exam.level}`}, {exam.fullMark} Markes</p>
                                <p><span>Instructor: </span> {exam.instructor} </p>
                            </div>
                            <div className='exam-info-time'>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><IoCalendarOutline className='icon' /> Date</p>
                                        <p>{format(exam.date, "EEEE, MMM do")}</p>
                                    </div>
                                </div>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><MdAccessTime className='icon' /> Time</p>
                                        <p>{formatTimeTo12Hour(exam.time)}</p>
                                    </div>
                                </div>
                                <div className='exam-item card'>
                                    <div className="text-capitalize exam-time">
                                        <p><CiAlarmOn className='icon' /> Duration</p>
                                        <p>{exam.duration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='exam-timer mb-5'>
                            <p className='mb-1 text-end'> {formatTime(timeLeft * parseInt(exam.duration))} </p>
                            <div className="progress" role="progressbar">
                                <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
                            </div>
                        </div>
                        <div className='exam-from mb-2'>
                            {questions?.length > 0 ? (
                                questions.map((question, index) => (
                                    <div key={index} className="my-5">
                                        <div className='exam-item card'>
                                            <div className="card-body p-0">
                                                <div className="exam-row">
                                                    <p>Quettion {index + 1}</p>
                                                    <h5>{question.title || 'No question text'}</h5>
                                                    {question.image && (
                                                        <div className='img-code'>
                                                            <img src={question.image} alt='Code' />
                                                        </div>
                                                    )}
                                                    <div className="options">
                                                        {/* {question.incorrectOptions.map((option, i) => (
                                                            <label key={i} className='option'>
                                                                <input
                                                                    type='radio'
                                                                    name={`option${index}`}
                                                                    value={option}
                                                                />
                                                                <span>{String.fromCharCode(65 + i)} : {option}</span>
                                                            </label>
                                                        ))} */}

                                                        {/* {['falseOption1', 'falseOption2', 'correctOption'].map((optionType, i) => (
                                                            <label key={i} className={`option ${isReviewMode && optionType === 'correctOption' ? 'correct-answer' : ''}`}>
                                                                <input
                                                                    type='radio'
                                                                    name={`option${index}`}
                                                                    checked={userAnswers[question.id] === question[optionType]}
                                                                    onChange={() => handleAnswer(question.id, question[optionType])}
                                                                    disabled={isReviewMode}
                                                                />
                                                                <span>{String.fromCharCode(65 + i)}  : {question[optionType]}</span>
                                                            </label>
                                                        ))} */}


                                                        <label className='option'>
                                                            <input
                                                                type='radio'
                                                                name={`option${index}`}
                                                                onClick={() => handleAnswer(index, false)}
                                                            />
                                                            <span>A : {question.falseOption1}</span>
                                                        </label>
                                                        <label className='option'>
                                                            <input
                                                                type='radio'
                                                                name={`option${index}`}
                                                                onClick={() => handleAnswer(index, false)}
                                                            />
                                                            <span>B : {question.falseOption2}</span>
                                                        </label>

                                                        <label className='option'>
                                                            <input
                                                                type='radio'
                                                                name={`option${index}`}
                                                                onClick={() => handleAnswer(index, true)}
                                                            />
                                                            <span>C : {question.correctOption}</span>
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
                            <button onClick={() => navigate(-1)} className='btn exam-btn text-uppercase'>
                                {isReviewMode ? 'Back to Result' : 'Cancel'}
                            </button>
                            <button onClick={handelSubmit} className='btn exam-btn text-uppercase'>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OnlineExam;