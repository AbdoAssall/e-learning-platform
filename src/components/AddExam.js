/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useCallback } from 'react';
import '../assets/css/addexam.css'
import Navbar from '../components/Navbar';
import ExamForm from './ExamForm';
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { db } from '../db';
import { useCreateExam } from '../exams/useCreateExam';
import { useUpdateExam } from '../exams/useUpdateExam';
import { useExams } from '../exams/useExams';
import { useCourses } from '../exams/useCourses';
import { useQuestions } from '../exams/useQuestions';
import { useCreateََQuestion } from '../exams/useCreateQuestion';
import { useUpdateQuestion } from '../exams/useUpdateQuestion';
import { useHref, useParams } from 'react-router-dom';
import { createUpdateQuestion } from '../services/apiQuestions';


const AddExam = ({ examId }) => {
    // const { examId } = useParams();
    const { exams, isLoading, error } = useExams();
    const [examData, setExamData] = useState({
        course_id: '',
        level: '',
        fullMark: '',
        date: '',
        time: '',
        duration: '',
        instructor: '',
    });

    const { courses } = useCourses();
    const { createExam, isCreating } = useCreateExam();
    const { updateExam, isEditing } = useUpdateExam();
    const { createQuestion } = useCreateََQuestion();
    const { updateQuestion } = useUpdateQuestion();
    const [questionData, setQuestionData] = useState([])
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (examId && exams) {
            const exam = exams.find(e => e.id === parseInt(examId))
            if (exam) {
                setExamData(exam)
            }
        }
    }, [examId, exams])

    const { questions } = useQuestions(examId);

    const handleCourseChange = useCallback(async (e) => {
        const selectedCourseId = parseInt(e.target.value);
        // const selectedCourse = courses.find(course => course.id === selectedCourseId);
        const existingExam = exams.find(exam => exam.course_id === selectedCourseId);

        if (existingExam) {
            setExamData(prev => ({
                ...prev,
                course_id: selectedCourseId,
                // id: existingExam ? existingExam.id : '',
                level: existingExam ? existingExam.level : '',
                fullMark: existingExam ? existingExam.fullMark : '',
                time: existingExam ? existingExam.time : '',
                date: existingExam ? formatDate(existingExam.date) : '',
                duration: existingExam ? existingExam.duration : '',
                // durationTime: existingExam ? existingExam.durationTime : 'hours',
                instructor: existingExam ? existingExam.instructor : '',
                // questions: existingExam ? existingExam.questions : [],
            }));
        }

    }, [exams]);


    useEffect(() => {
        if (questions) {
            // setQuestionData(prev => ({ ...prev, questions }));
            setQuestionData(questions);
        }
    }, [questions]);

    // useEffect(() => {
    //     if (selectedCourseId) {
    //         const existingExam = exams.find(exam => exam.course_id === selectedCourseId);

    //         if (existingExam) {
    //             setExamData({
    //                 ...existingExam,
    //                 date: existingExam.date ? formatDate(existingExam.date) : '',
    //             });
    //         } else {
    //             setExamData({
    //                 course_id: selectedCourseId,
    //                 level: '',
    //                 fullMark: '',
    //                 date: '',
    //                 time: '',
    //                 duration: '',
    //                 instructor: '',
    //             });
    //         }
    //     }
    // }, [selectedCourseId, exams]);

    // useEffect(() => {
    //     if (questions && questions.length > 0) {
    //         const question = questions.find(e => e.exam_id === parseInt(examId))
    //         setQuestionData(question);
    //     } else {
    //         setQuestionData([]);
    //     }
    // }, [examId, questions]);

    // Handle course selection change
    // const handleCourseChange = (e) => {
    //     const selectedCourseId = parseInt(e.target.value);
    //     setSelectedCourseId(selectedCourseId);
    // };

    // Handle input changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setExamData(prev => ({ ...prev, [name]: value }))
        // setExamData({
        //     ...examData,
        //     [name]: value || ''
        // });
    }, []);


    // Handle duration change
    const handleDurationChange = (e) => {
        const { value } = e.target;
        setExamData(prevData => ({
            ...prevData,
            durationTime: value || 'hour'
        }));
    };

    // Handle date change
    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setExamData(prev => ({ ...prev, date: dateValue }));
        // const userDate = new Date(dateValue);
        // const formattedDate = format(userDate, "EEEE, MMM do");
        // setExamData({ ...examData, date: dateValue });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // إضافة صفر إذا كان الشهر أقل من 10
        const day = String(date.getDate()).padStart(2, '0'); // إضافة صفر إذا كان اليوم أقل من 10
        return `${year}-${month}-${day}`; // تنسيق yyyy-MM-dd
    }
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return date.toISOString().split('T')[0];
    // };

    // const handleQuestionsUpdate = useCallback((updatedQuestions) => {
    //     setExamData(prev => ({ ...prev, questions: updatedQuestions }));
    // }, []);

    // const handleQuestionsUpdate = useCallback(async (updatedQuestions) => {
    //     const currentExamId = examId || examData.id;

    //     if (!currentExamId) {
    //         console.error("Exam ID is not set. Cannot update questions.");
    //         setExamData(prev => ({ ...prev, questions: updatedQuestions }));
    //         return;
    //     }


    //     try {
    //         // Handle creation, update, and deletion of questions
    //         for (const question of updatedQuestions) {
    //             if (question.id) {
    //                 // Update existing question
    //                 await updateQuestion({ ...question, exam_id: currentExamId });
    //             } else {
    //                 // Create new question
    //                 await createQuestion({ ...question, exam_id: currentExamId });
    //             }
    //         }

    //         // Delete questions that are no longer in the updatedQuestions array
    //         const currentQuestionIds = questions.map(q => q.id);
    //         const updatedQuestionIds = updatedQuestions.map(q => q.id).filter(Boolean);
    //         // const questionsToDelete = currentQuestionIds.filter(id => !updatedQuestionIds.includes(id));

    //         // for (const questionId of questionsToDelete) {
    //         //     await deleteQuestion(questionId);
    //         // }

    //     } catch (error) {
    //         console.error('Error updating questions:', error);
    //         alert('Failed to update questions. Please try again.');
    //     }
    // }, [examId, examData.id, createQuestion, updateQuestion]);

    const handleQuestionsUpdate = useCallback((updatedQuestions) => {
        // setQuestionData(prev => ({ ...prev, questions: updatedQuestions }));
        setQuestionData(updatedQuestions);
    }, []);
    console.log(questionData)

    // Handle form submission
    const handleSaveExam = async (e) => {
        e.preventDefault();
        if (!examData.course_id) {
            alert('Please select a course and fill in the required fields.');
            return;
        }
        const { questions = [], ...finalData } = examData

        try {
            let savedExam;
            const examToSave = { ...questions };
            if (examId) {
                // savedExam = await updateExam({ finalData, examId });


                await db.questions.update(examToSave, examId);
            } else {
                // savedExam = await createExam(finalData);

                await db.questions.put(examToSave);
            }

            for (let question of questions) {
                if (question.id) {
                    await updateQuestion({ ...question, exam_id: savedExam.id });  // Update existing question
                } else {
                    await createQuestion({ ...question, exam_id: savedExam.id });  // Create new question
                }
            }
            
            setShowToast(true)
            // alert('Exam Data Saved Successfully!');
            console.log('Exam successfully saved:', examData);
            console.log('Exam successfully saved:', examToSave);
        } catch (error) {
            console.error('Error saving exam:', error);
            alert('Failed to save exam. Please try again.');
        }

    };

    useEffect( () => {
        if (showToast) {
           const timer = setTimeout(() => {
            setShowToast(false);
           }, 5000)
           
           return () => clearTimeout(timer)
        }
    }, [showToast])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses</div>;

    return (
        <div className="main-bg">
            <div className='container'>
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        {showToast && (
                            <div className="toast position-fixed" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header" data-bs-theme="dark">
                                    <button onClick={() => setShowToast(false)} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div className="toast-body">
                                    Exam successfully saved
                                </div>
                            </div>
                        )}

                        <h4>Create new Exam</h4>
                        <p>{new Date().toDateString()}</p>
                    </div>
                    <div className='exam-add d-flex justify-content-between mb-5'>
                        <h4 className='text-capitalize'>Add exam details</h4>
                        <button className='btn exam-btn text-uppercase' onClick={handleSaveExam}>Publish</button>
                    </div>
                    <div className='exam-from mb-2'>
                        <h6 className='text-capitalize out-form'>Exam Information</h6>
                        <form method='post' onSubmit={handleSaveExam}>
                            <div className="mb-3 mt-3">
                                <div className='exam-item card add-card-exam'>
                                    <h6 className='text-capitalize inside-form d-none'>Exam Information</h6>
                                    <div className="card-body p-0 d-flex flex-wrap">
                                        <div className="exam-row">
                                            <label htmlFor="examName" className="form-label text-capitalize">Course Name</label>
                                            <select
                                                className="form-select"
                                                value={examData.course_id}
                                                name="courseName"
                                                onChange={(e) => handleCourseChange(e)}>
                                                <option value="" hidden>Select a course</option>
                                                {courses && courses.length > 0 ? (
                                                    courses.map(course => (
                                                        <option key={course.id} value={course.id}>{course.title}</option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>No courses available</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="exam-row level">
                                            <label htmlFor="examName" className="form-label text-capitalize">Level</label>
                                            <input
                                                type='text'
                                                name='level'
                                                value={examData.level}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="exam-row full-mark">
                                            <label htmlFor="examName" className="form-label text-capitalize">Full Mark</label>
                                            <input
                                                type='text'
                                                name='fullMark'
                                                value={examData.fullMark}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="exam-row mb-0 date position-relative">
                                            <label htmlFor="examName" className="form-label text-capitalize">Date</label>
                                            <input
                                                type='date'
                                                name='date'
                                                value={examData.date}
                                                onChange={(e) => handleDateChange(e)}
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
                                                onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                                {/* <select
                                                    name='durationTime'
                                                    value={examData.durationTime}
                                                    onChange={(e) => handleDurationChange(e)}
                                                    className="form-select">
                                                    <option value="hours">hours</option>
                                                    <option value="mins">mins</option>
                                                </select> */}
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
                        <ExamForm
                            selectedCourseId={examData.id}
                            onQuestionsUpdate={handleQuestionsUpdate}
                            initialQuestions={questionData}
                        />
                    </div>
                    <div className='exam-from-btns mb-3' id='add-exam-btns'>
                        <button className='btn exam-btn text-uppercase'>Cancel</button>
                        {window.innerWidth <= 768 ? (<button className='btn exam-btn text-uppercase'>Publish</button>) :
                            (<button
                                disabled={isCreating || isEditing}
                                className='btn exam-btn text-uppercase'
                                onClick={handleSaveExam}
                            >
                                {/* {isCreating ? 'Creating...' : isEditing ? 'Editing...' : 'Publish'} */}
                                {isCreating || isEditing ? 'Saving...' : 'Save'}
                            </button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddExam;