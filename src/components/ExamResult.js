// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import '../assets/css/examresult.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { Progress } from 'rsuite';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import supabase from '../services/supabase';


const ExamResult = () => {
    const { id } = useParams() ;
    const navigate = useNavigate();
    const [examResult, setExamResult] = useState(null)
    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExamResult = async () => {
            try {
                setIsLoading(true);

                // Fetch exam result
                const { data: resultData, error: resultError } = await supabase
                    .from('questions')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (resultError) throw resultError;
                setExamResult(resultData);
                console.log()

                // Fetch exam details
                const { data: examData, error: examError } = await supabase
                    .from('exams')
                    .select('*, courses(*)')
                    .eq('id', resultData.exam_id)
                    .single();

                if (examError) throw examError;
                setExam(examData);

            } catch (error) {
                console.error('Error fetching exam result:', error);
                setError(error.message || 'Failed to load exam result');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExamResult();
    }, [id]);

    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':');
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

    const getProgressPercentage = () => {
        const totalDurationInSeconds = parseInt(exam.duration) * 60;
        return (Math.abs(examResult.timeSpent) / totalDurationInSeconds) * 100;
    };

    const handleViewAnswers = () => {
        if (exam){
            navigate(`/online-exam/${exam.id}?mode=review&resultId=${id}`)
        }
    }


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading exam data</div>;
    if (!exam) return <div>Exam not found</div>;
    if (!examResult || !exam) return <div>No exam result found</div>;
 
    const percent = (examResult.score /exam.fullMark) * 100;

    return (
        <div className="main-bg">
            <div className="container">
            <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Online Exam Result</h4>
                        <p> {new Date().toDateString()} </p>
                    </div>
                    <div className='online-exam d-flex justify-content-between'>
                        <div className='title-info'>
                            <h4 className='text-capitalize'>{exam.courses.title}</h4>
                            <p>{`lev.${exam.level}`}, {exam.fullMark} Markes</p>
                            <p><span>Instructor: </span> {exam.instructor}</p>
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
                                    <p> {formatTimeTo12Hour(exam.time)} </p>
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
                            <p className='mb-1 text-end'> {Math.floor(Math.abs(examResult.timeSpent) / 60)}:{Math.abs(examResult.timeSpent) % 60} </p>
                            <div className="progress" role="progressbar">
                                <div className="progress-bar" style={{ width: `${getProgressPercentage()}}%` }}></div>
                            </div>
                        </div>
                    <div className='exam-from result mb-2'>
                        <div className='exam-item card'>
                            <div className="card-body p-0">
                                <div className="resul-card row justify-content-between align-items-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className='progress-circle'>
                                            <div style={{ width: 150 }} className='circle-outer'>
                                                <Progress.Circle percent={percent} showInfo={false} strokeColor={"var(--primary-color)"} trailColor={"#fff"} trailWidth={3} />
                                            </div>
                                            <div style={{ width: 120 }} className='circle-inner'>
                                                <Progress.Circle percent={percent} showInfo={false} strokeColor={"var(--primary-color)"} trailColor={"#fff"} trailWidth={3} />
                                            </div>
                                            <div className="circle-text">
                                                <span> {examResult.score.toString().padStart(2, ' ')} / {exam.fullMark} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className='exam-from-btns mb-3'>
                                            <button onClick={handleViewAnswers} className='btn exam-btn text-uppercase'>View Answers</button>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <div className="info-results">
                                            <div className="info-answered">
                                                <h6>Number of questions answered :</h6>
                                                <div className='info-answered-card'>
                                                    <p>{examResult.answered} Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of questions not answered :</h6>
                                                <div className='info-answered-card'>
                                                    <p>{examResult.unanswared_questions} Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of questions answered correctly :</h6>
                                                <div className='info-answered-card'>
                                                    <p>{examResult.correct} Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of wrong answers :</h6>
                                                <div className='info-answered-card'>
                                                    <p>{examResult.wrong_answers} Answer</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Time Taken:</h6>
                                                <div className='info-answered-card'>
                                                    <p>{Math.floor(Math.abs(examResult.timeSpent) / 60)}:{Math.abs(examResult.timeSpent) % 60} Minutes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ExamResult;