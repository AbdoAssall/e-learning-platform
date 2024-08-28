import { React, useState, useCallback } from 'react';
import '../assets/css/addexam.css'
import Navbar from '../components/Navbar';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { TfiTrash } from "react-icons/tfi";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";

const AddExam = () => {
    const [inputValue, setInputValue] = useState('');
    const getImage = useCallback ((e) => {
        const file = e.target.files[0]
        if (file) {
            const fileNmae = file.name;
            setInputValue(fileNmae)
        }
    }, [])

    return (
        <div className="main-bg">
            <div className='container'>
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Create new Exam</h4>
                        <p>6th June 2023</p>
                    </div>
                    <div className='exam-add d-flex justify-content-between mb-5'>
                        <h4 className='text-capitalize'>Add exam details</h4>
                        <button className='btn exam-btn text-uppercase'>Publish</button>
                    </div>
                    <div className='exam-from mb-2'>
                        <h6 className='text-capitalize out-form'>Exam Information</h6>
                        <form>
                            <div className="mb-3 mt-3">
                                <div className='exam-item card add-card-exam'>
                                    <h6 className='text-capitalize inside-form d-none'>Exam Information</h6>
                                    <div className="card-body p-0 d-flex flex-wrap">
                                        <div className="exam-row">
                                            <label for="examName" className="form-label text-capitalize">Course Name</label>
                                            <select className="form-select">
                                                <option selected hidden></option>
                                                <option value="1">Front-end</option>
                                                <option value="2">Back-end</option>
                                                <option value="3">Full-Stack Developer</option>
                                                <option value="2">Design</option>
                                            </select>
                                        </div>
                                        <div className="exam-row level">
                                            <label for="examName" className="form-label text-capitalize">Level</label>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row full-mark">
                                            <label for="examName" className="form-label text-capitalize">Full Mark</label>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row mb-0 date position-relative">
                                            <label for="examName" className="form-label text-capitalize">Date</label>
                                            <input type='text' className="form-control"/>
                                            <IoCalendarOutline className='icon-form'  />
                                        </div>
                                        <div className="exam-row mb-0 time position-relative">
                                            <label for="examName" className="form-label text-capitalize">Time</label>
                                            <input type='text' className="form-control"/>
                                            <MdAccessTime className='icon-form'  />
                                        </div>
                                        <div className="exam-row mb-0 duration position-relative">
                                            <label for="examName" className="form-label text-capitalize">Duration</label>
                                            <input type='text' className="form-control"/>
                                            <CiAlarmOn className='icon-form'  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='exam-from mb-2'>
                        <h6 className='text-capitalize'>Questions</h6>
                        <form>
                            <div className="question-container my-3 d-flex">
                                <div className='exam-item card border-dashed'>
                                    <div className="card-body p-0 d-flex flex-wrap justify-content-between">
                                        <div className="exam-row question">
                                            <div className='for-mobile'>
                                                <button className='remove-icon d-none'>
                                                    <TfiTrash className='icon' title='Delete form' />
                                                </button>
                                                <label for="examName" className="form-label text-capitalize">Question 1</label>
                                            </div>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row q-mark">
                                            <label for="examName" className="form-label text-capitalize">Mark</label>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row question-type">
                                            <label for="questionType" className="form-label text-capitalize">Question Type</label>
                                            <select id="questionType" className="form-select">
                                                <option value="Multiple choices">Multiple choices</option>
                                                <option value="True/False">True/False</option>
                                                <option value="Fill in the blanks">Fill in the blanks</option>
                                                <option value="Short answer">Short answer</option>
                                                <option value="Paragraph">Paragraph</option>
                                            </select>
                                        </div>
                                        <div className="exam-row image-upload position-relative">
                                            <label className="form-label text-capitalize d-block">Image Upload</label>
                                            <label for="imageUpload" className='label-upload'>
                                                <RiUploadCloud2Line className='icon' />
                                                <input type='text' className="form-control" value={inputValue} readOnly />
                                            </label>
                                            <input onChange={getImage} type="file" id="imageUpload" className="form-control" accept="image/*" />
                                        </div>
                                        <div className="exam-row option1">
                                            <div className='for-mobile'>
                                                <button className='remove-icon d-none'>
                                                    <TfiTrash className='icon' />
                                                </button>
                                                <label className="form-label text-capitalize">Option</label>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <label className="option-button" for='correct'>
                                                    <button className="correct-btn btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</button>
                                                    <input type="text" id='correct' className="option-input form-control" />
                                                    <textarea className="option-area form-control d-none"></textarea>
                                                </label>
                                                <button className='remove-icon'>
                                                    <TfiTrash className='icon' title='Delete option' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="exam-row option2">
                                            <div className='for-mobile'>
                                                <div className='option-icons d-none'>
                                                    <button className='remove-icon'>
                                                        <TfiTrash className='icon' />
                                                    </button>
                                                    <button className='add-icon'>
                                                        <IoAddCircleOutline className='icon' />
                                                    </button>
                                                </div>
                                                <label className="form-label text-capitalize">Option</label>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <label className="option-button" for='wrong'>
                                                    <button className="wrong-btn btn"><span><FaRegTimesCircle className='icon' /></span> Wrong answer</button>
                                                    <input type="text" id='wrong' className="option-input form-control" />
                                                    <textarea className="option-area form-control d-none"></textarea>
                                                </label>
                                                <button className='remove-icon'>
                                                    <TfiTrash className='icon' title='Delete option' />
                                                </button>
                                                <button className='add-icon'>
                                                    <IoAddCircleOutline className='icon' title='Add option' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='remove-icon remove-icon-from ms-3'>
                                    <TfiTrash className='icon' title='Delete form' />
                                </button>
                            </div>
                        </form>
                        <form>
                            <div className="question-container my-3 d-flex">
                                <div className='exam-item card border-dashed'>
                                    <div className="card-body p-0 d-flex flex-wrap justify-content-between">
                                        <div className="exam-row question">
                                            <div className='for-mobile'>
                                                <button className='remove-icon d-none'>
                                                    <TfiTrash className='icon' title='Delete form' />
                                                </button>
                                                <label for="examName" className="form-label text-capitalize">Question 2</label>
                                            </div>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row q-mark">
                                            <label for="examName" className="form-label text-capitalize">Mark</label>
                                            <input type='text' className="form-control" />
                                        </div>
                                        <div className="exam-row question-type">
                                            <label for="questionType" className="form-label text-capitalize">Question Type</label>
                                            <select id="questionType" className="form-select">
                                                <option value="Short answer">Short answer</option>
                                                <option value="Multiple choices">Multiple choices</option>
                                                <option value="True/False">True/False</option>
                                                <option value="Fill in the blanks">Fill in the blanks</option>
                                                <option value="Paragraph">Paragraph</option>
                                            </select>
                                        </div>
                                        <div className="exam-row image-upload position-relative">
                                            <label className="form-label text-capitalize d-block">Image Upload</label>
                                            <label for="imageUpload" className='label-upload'>
                                                <RiUploadCloud2Line className='icon' />
                                                <input type='text' className="form-control" value={inputValue} readOnly />
                                            </label>
                                            <input onChange={getImage} type="file" id="imageUpload" className="form-control" accept="image/*" />
                                        </div>
                                        <div className="exam-row answer">
                                            <label className="form-label text-capitalize">Answer</label>
                                            <label className="option-button">
                                                <button className="correct-btn btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</button>
                                                <textarea className="answer-input form-control"></textarea>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='add-question ms-3'>
                                    <span className='text-capitalize text-light me-3'>Add Questions</span>
                                    <button className='add-icon'>
                                        <IoAddCircleOutline className='icon' title='Add' />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='exam-from-btns mb-3' id='add-exam-btns'>
                        <button className='btn exam-btn text-uppercase'>Cancel</button>
                        {window.innerWidth <= 768 ? (<button className='btn exam-btn text-uppercase'>Publish</button>) :
                            (<button className='btn exam-btn text-uppercase'>Save</button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddExam;