/* eslint-disable no-unused-vars */
import { React, useState, useContext, useEffect } from 'react';
import '../assets/css/addexam.css'
import Navbar from '../components/Navbar';
import ExamForm from './ExamForm';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { ExamContext } from '../context/ExamProvider';
import { db } from '../db';


const AddExam = () => {
    const { examData, setExamData, saveExamDataToDB, loadExamDataFromDB } = useContext(ExamContext)
    const [courses, setCourses] = useState([]);

    const getCoursesFromDB = async (courseName) => {
        try {
            //  const courses = await db.courses.toArray();
            const course = await db.courses.where({ courseName }).first();
            return course.id
        } catch (error) {
            console.error('Error retrieving courses:', error);
            return [];
        }
    };

    // Get the list of courses from the database
    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourses = await db.courses.toArray(); // Retrieve all courses from database
            const fetchedExams = await db.exams.toArray();
            setCourses(fetchedCourses);
            setExamData(fetchedExams)
        };
        fetchCourses();
    }, []);

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setExamData({
            ...examData,
            [name]: value || ''
        });
    }
    const handleCourseChange = async (e) => {
        const selectedCourseName = e.target.value;

        // Retrieve exam data from database
        const courseId = await getCoursesFromDB(selectedCourseName);

        // Load exam data based on courseId
        const exam = await loadExamDataFromDB(courseId)

        // If the data exists, update it, if not, create an empty form
        if (exam) {
            setExamData(exam) // Adjust the data in the form
        } 
        else {
            // Create an empty form if there is no data
            setExamData({
                courseId,
                courseName: selectedCourseName,
                level: '',
                fullMark: '',
                date: '',
                time: '',
                duration: '',
                durationTime: 'hour',
                questions: [],
            });
        }

        // setExamData(prevData => ({
        //     ...prevData, 
        //     courseName: selectedCourse, 
        //     courseId: courseId
        // }));

    }
    const handleDurationChange = (e) => {
        const { value } = e.target;
        setExamData(prevData => ({
            ...prevData,
            durationTime: value || 'hour'
        }));
    }
    // Save exam data
    const handleSave = async (e) => {
        e.preventDefault();
        // try {
        //     // تأكد من أن courseId هو string عند الحفظ
        //     const examToSave = { ...examData, courseId: String(examData.courseId) };
        //     await db.exams.put(examToSave);
        //     console.log('Exam data saved to IndexedDB:', examToSave);
        // } catch (error) {
        //     console.error('Error saving exam data to IndexedDB:', error);
        // }
        await saveExamDataToDB() // Save exam data to IndexedDB

        alert('Exam Data Saved Successfully!');
    };
    console.log('Exam Data:', examData);

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
                                            <label htmlFor="examName" className="form-label text-capitalize">Course Name</label>
                                            <select
                                                className="form-select"
                                                value={examData.courseName}
                                                name="courseName"
                                                onChange={(e) => handleCourseChange(e)}>
                                                <option value="" hidden>Select a course</option>
                                                {courses.map(course => (
                                                    <option key={course.id} value={course.courseName}>
                                                        {course.courseName}
                                                    </option>
                                                ))}
                                                {/* <option value="Introduction to Data Analysis">Introduction to Data Analysis</option>
                                                <option value="System Analysis and Design">System Analysis and Design</option>
                                                <option value="Introduction to Web Development">Introduction to Web Development</option>
                                                <option value="Introduction to React JS">Introduction to React JS</option> */}
                                            </select>
                                        </div>
                                        <div className="exam-row level">
                                            <label htmlFor="examName" className="form-label text-capitalize">Level</label>
                                            <input
                                                type='text'
                                                name='level'
                                                value={examData.level}
                                                onChange={handelInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="exam-row full-mark">
                                            <label htmlFor="examName" className="form-label text-capitalize">Full Mark</label>
                                            <input
                                                type='text'
                                                name='fullMark'
                                                value={examData.fullMark}
                                                onChange={handelInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="exam-row mb-0 date position-relative">
                                            <label htmlFor="examName" className="form-label text-capitalize">Date</label>
                                            <input
                                                type='text'
                                                name='date'
                                                value={examData.date}
                                                onChange={handelInputChange}
                                                className="form-control"
                                            />
                                            <IoCalendarOutline className='icon-form' />
                                        </div>
                                        <div className="exam-row mb-0 time position-relative">
                                            <label htmlFor="examName" className="form-label text-capitalize">Time</label>
                                            <input
                                                type='text'
                                                name='time'
                                                value={examData.time}
                                                onChange={handelInputChange}
                                                className="form-control"
                                            />
                                            <MdAccessTime className='icon-form' />
                                        </div>
                                        <div className="exam-row mb-0 duration position-relative">
                                            <label htmlFor="examName" className="form-label text-capitalize">Duration</label>
                                            <div className="input-group">
                                                <input
                                                    type='text'
                                                    name='duration'
                                                    value={examData.duration}
                                                    onChange={handelInputChange}
                                                    className="form-control"
                                                />
                                                <select
                                                    name='durationTime'
                                                    value={examData.durationTime}
                                                    onChange={(e) => handleDurationChange(e)}
                                                    className="form-select">
                                                    <option value="hour">hour</option>
                                                    <option value="min">min</option>
                                                </select>
                                            </div>
                                            <CiAlarmOn className='icon-form' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='exam-from mb-2'>
                        <h6 className='text-capitalize'>Questions</h6>
                        <ExamForm />
                    </div>
                    <div className='exam-from-btns mb-3' id='add-exam-btns'>
                        <button className='btn exam-btn text-uppercase'>Cancel</button>
                        {window.innerWidth <= 768 ? (<button className='btn exam-btn text-uppercase'>Publish</button>) :
                            (<button onClick={(e) => handleSave(e)} className='btn exam-btn text-uppercase'>Save</button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddExam;