// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import '../assets/css/examresult.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { Progress } from 'rsuite';


const ExamResult = () => {
    const [percent, setPercent] = useState(19);

    useEffect(() => {
        const percentage = (percent / 20) * 100
        setPercent(percentage)
    }, [percent.percentage])
   
    const mark = (percent * 20) / 100

    return (
        <div className="main-bg">
            <div className="container">
            <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Online Exam Result</h4>
                        <p>6th June 2023</p>
                    </div>
                    <div className='online-exam d-flex justify-content-between'>
                        <div className='title-info'>
                            <h4 className='text-capitalize'>Introduction to React JS</h4>
                            <p>Lev.1, 20 Markes</p>
                            <p><span>Instructor: </span> Tariq Ali</p>
                        </div>
                        <div className='exam-info-time'>
                            <div className='exam-item card'>
                                <div className="text-capitalize exam-time">
                                    <p><IoCalendarOutline className='icon' /> Date</p>
                                    <p>Monday, June 5th</p>
                                </div>
                            </div>
                            <div className='exam-item card'>
                                <div className="text-capitalize exam-time">
                                    <p><MdAccessTime className='icon' /> Time</p>
                                    <p>12:30 PM</p>
                                </div>
                            </div>
                            <div className='exam-item card'>
                                <div className="text-capitalize exam-time">
                                    <p><CiAlarmOn className='icon' /> Duration</p>
                                    <p>1 Hour</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='exam-timer mb-5'>
                        <p className='mb-1 text-end'>60:00</p>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar"></div>
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
                                                <span>{mark} / {20}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className='exam-from-btns mb-3'>
                                            <button className='btn exam-btn text-uppercase'>View Answers</button>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <div className="info-results">
                                            <div className="info-answered">
                                                <h6>Number of questions answered :</h6>
                                                <div className='info-answered-card'>
                                                    <p>20 Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of questions not answered :</h6>
                                                <div className='info-answered-card'>
                                                    <p>0 Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of questions answered correctly :</h6>
                                                <div className='info-answered-card'>
                                                    <p>19 Questions</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Number of wrong answers :</h6>
                                                <div className='info-answered-card'>
                                                    <p>1 Answer</p>
                                                </div>
                                            </div>
                                            <div className="info-answered">
                                                <h6>Time Taken:</h6>
                                                <div className='info-answered-card'>
                                                    <p>60:00 Minutes</p>
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