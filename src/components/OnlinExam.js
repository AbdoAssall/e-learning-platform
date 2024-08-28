/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import '../assets/css/onlineexam.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import CodeImage from '../assets/images/code.png'

const OnlineExam = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const optionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const submitExam = () => {
        console.log('Selected Option', selectedOption)
    }

    return (
        <div className="main-bg">
            <div className="container">
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Online Exam</h4>
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
                        <p className='mb-1 text-end'>55:00</p>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: '90%' }}></div>
                        </div>
                    </div>
                    <div className='exam-from mb-2'>
                        <div className="my-3">
                            <div className='exam-item card'>
                                <div className="card-body p-0">
                                    <div className="exam-row">
                                        <p>Quettion 1</p>
                                        <h5>Chose the right option out the following :</h5>
                                        <div className="options">
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="A"
                                                />
                                                <span>A :</span>
                                            </label>
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="B"
                                                />
                                                <span>B :</span>
                                            </label>
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="C"
                                                />
                                                <span>C :</span>
                                            </label>
                                            <span className="selection" />
                                        </div>
                                        <p className='text-end'>2 Markes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div className='exam-item card'>
                                <div className="card-body p-0">
                                    <div className="exam-row">
                                        <p>Quettion 2</p>
                                        <h5>What is the type of function used in the following example :</h5>
                                        <div className='img-code'>
                                            <img src={CodeImage} alt='Code' />
                                        </div>
                                        <div className="options">
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="A"
                                                />
                                                <span>A :</span>
                                            </label>
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="B"
                                                />
                                                <span>B :</span>
                                            </label>
                                            <label className='option'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value="C"
                                                />
                                                <span>C :</span>
                                            </label>
                                            <span className="selection" />
                                        </div>
                                        <p className='text-end'>3 Markes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='exam-from-btns mb-3'>
                        <button className='btn exam-btn text-uppercase'>Cancel</button>
                        <button onClick={submitExam} className='btn exam-btn text-uppercase'>Submit</button>
                    </div>
                </div>
            </div >
        </div>
    )
}
export default OnlineExam;