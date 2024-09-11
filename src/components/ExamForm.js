import React, { useEffect, useState, useCallback } from 'react';
import { useQuestions } from '../exams/useQuestions';
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { useExams } from '../exams/useExams';

function ExamForm({examId, onQuestionsUpdate, initialQuestions,  }) {
    const { questions, isLoading, error } = useQuestions(examId);

    const [questionData, setQuestionData] = useState([{
        exam_id: examId || '',
        title: '',
        mark: '',
        questionType: '',
        image: null,
        imageName: '',
        correctOption: '',
        falseOptions: [''],
        answer: '',
        created_at: new Date().toISOString()
    }])

    useEffect(() => {
        if (questions && questions.length > 0) {
            setQuestionData(questions.map(q => ({
                ...q,
                // exam_id: q.exam_id || '',
                title: q.title || '',
                mark: q.mark || '',
                questionType: q.questionType || '',
                image: q.image || null,
                imageName: q.imageName || '',
                correctOption: q.correctOption || '',
                falseOptions: q.falseOptions || [''],
                answer: q.answer || '',
                created_at: q.created_at || new Date().toISOString()
            })));
        } else {
            setQuestionData([{
                exam_id: examId || '',
                title: '',
                mark: '',
                questionType: '',
                image: null,
                imageName: '',
                correctOption: '',
                falseOptions: [''],
                answer: '',
                created_at: new Date().toISOString()
            }]);
        }
    }, [questions, examId]);



    // useEffect(() => {
    //     if (examId && initialQuestions && initialQuestions.length > 0) {
    //         const examQuestions = questions.filter(q => q.exam_id === examId);
    //         if (examQuestions.length > 0) {
    //             setQuestionData(examQuestions.map(q => ({
    //                 ...q,
    //                 falseOptions: q.falseOptions || [''],
    //                 created_at: q.created_at || new Date().toISOString()
    //             })));
    //         }
    //     }
    // }, [examId, questions]);

    // useEffect(() => {
    //     if (examId && questions && questions.length > 0) {
    //         setQuestionData(questions.map(q => ({
    //             ...q,
    //             falseOptions: q.falseOptions || [''],
    //             created_at: q.created_at || new Date().toISOString()
    //         })));
    //     }
    // }, [examId, questions]);

    useEffect(() => {
        onQuestionsUpdate(questionData);
    }, [questionData, onQuestionsUpdate]);


    // useEffect(() => {
    //     if (questions && questions.length > 0) {
    //         const question = questions.filter(q => q.exam_id === examId)
    //         setQuestionData(prev => ([{
    //             ...prev,
    //             exam_id: examId,
    //             title: question.title || '',
    //             mark: question.mark || '',
    //             questionType: question.questionType || '',
    //             image: question.image || null,
    //             imageName: question.imageName || '',
    //             correctOption: question.correctOption || '',
    //             falseOptions: question.falseOption || [''],
    //             answer: question.answer || '',
    //             paragraph: question.paragraph || '',
    //             created_at: question.created_at || new Date().toISOString()
    //         }]));
    //     } else {
    //         setQuestionData([{
    //             exam_id: '',
    //             title: '',
    //             mark: '',
    //             questionType: '',
    //             image: null,
    //             imageName: '',
    //             correctOption: '',
    //             falseOptions: [''],
    //             answer: '',
    //             paragraph: '',
    //             created_at: new Date().toISOString()
    //         }]);
    //     }
    // }, [examId, setQuestionData]);

    // useEffect(() => {
    //     if (questions && questions.length > 0) {
    //         setQuestionData(questions);
    //     }
    // }, [questions]);

    // useEffect(() => {
    //     if (questionData.length > 0) {
    //         onQuestionsUpdate(questionData);
    //     }
    // }, [questionData, onQuestionsUpdate]);

    // const { createQuestion, isCreating } = useCreateََQuestion();


    //const existingQuestion = questions.find(question => question.exam_id === examId);

    console.log(questionData)
    // console.log(questions)


    // const [questionData, setQuestionData] = useState(() => 
    //     initialQuestions && initialQuestions.length > 0
    //         ? initialQuestions
    //         : [{
    //             exam_id: examId,
    //             id: '',
    //             title: '',
    //             mark: '',
    //             questionType: '',
    //             image: null,
    //             imageName: '',
    //             correctOption: '',
    //             falseOption: [''],
    //             answer: '',
    //             paragraph: '',
    //         }]
    // );


    // useEffect(() => {
    //     if (!isLoading && questions && questions.length > 0 && examId) {
    //         const exam = questions.find(q => q.id === examId);
    //         if (exam && exam.questions) {
    //             setQuestionData(exam.questions);
    //         }
    //     }
    // }, [questions, isLoading, examId]);


    // const handleInputChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const newQuestions = [...questionData];
    //     newQuestions[index][name] = value;
    //     setQuestionData(newQuestions);
    // };

    const handleInputChange = useCallback((index, e) => {
        const { name, value } = e.target;
        setQuestionData(prevData => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [name]: value };
            return newData;
        });
    }, []);

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newQuestions = [...questionData];
                newQuestions[index].image = reader.result; // حفظ الصورة كـ Base64
                newQuestions[index].imageName = file.name; // اسم الصورة
                setQuestionData(newQuestions);
            };
            reader.readAsDataURL(file); // تحويل الصورة إلى Base64
        }
    };

    const handleCorrectOptionChange = (index, value) => {
        const newQuestions = [...questionData];
        newQuestions[index].correctOption = value;
        setQuestionData(newQuestions);
    };

    const handleIncorrectOptionChange = (index, optionIndex, value) => {
        const newQuestions = [...questionData];
        newQuestions[index].falseOptions[optionIndex] = value;
        setQuestionData(newQuestions);
    };

    const handleAddIncorrectOption = useCallback((index, e) => {
        e.preventDefault();
        setQuestionData(prevData => {
            const newData = [...prevData];
            newData[index].falseOptions.push('');
            return newData;
        });
    }, []);

    // const handleAddQuestion = (e) => {
    //     e.preventDefault();
    //     const newQuestion = {
    //         exam_id: examId,
    //         id: '',
    //         title: '',
    //         mark: '',
    //         questionType: '',
    //         image: null,
    //         imageName: '',
    //         correctOption: '',
    //         falseOption: [''],
    //         answer: '',
    //         paragraph: '',
    //     };
    //     setQuestionData([...questionData, newQuestion]);
    // };

    const handleAddQuestion = useCallback((e) => {
        e.preventDefault();
        setQuestionData(prevData => [
            ...prevData,
            {
                exam_id: examId || '',
                title: '',
                mark: '',
                questionType: '',
                image: null,
                imageName: '',
                correctOption: '',
                falseOptions: [''],
                answer: '',
                paragraph: '',
                created_at: new Date().toISOString()
            }
        ]);
    }, [examId]);

    const handleRemoveQuestion = useCallback((index, e) => {
        e.preventDefault();
        // const newQuestions = questionData.filter((_, i) => i !== index);
        // setQuestionData(newQuestions);
        setQuestionData(prevData => prevData.filter((_, i) => i !== index));
    }, []);

    const handleRemoveCorrectOption = (questionIndex) => {
        const newQuestions = [...questionData];
        newQuestions[questionIndex].correctOption = '';
        setQuestionData(newQuestions);
    };

    const handleRemoveIncorrectOption = useCallback((questionIndex, optionIndex) => {
        setQuestionData(prevData => {
            const newData = [...prevData];
            newData[questionIndex].falseOptions = newData[questionIndex].falseOptions.filter((_, i) => i !== optionIndex);
            return newData;
        });
    }, []);

    if (isLoading) return <div>Loading questions...</div>;
    if (error) return <div>Error loading questions: {error.message}</div>;

    return (
        <form>
            {questionData.map((question, index) => (
                <div key={index} className="question-container my-3 d-flex">
                    <div className='exam-item card border-dashed'>
                        <div className="card-body p-0 d-flex flex-wrap justify-content-between">
                            <div className="exam-row question">
                                <div className='for-mobile'>
                                    <button onClick={(e) => handleRemoveQuestion(index, e)} className='remove-icon d-none'>
                                        <TfiTrash className='icon' title='Delete form' />
                                    </button>
                                    <label htmlFor={`title${index}`} className="form-label text-capitalize">Question {index + 1}</label>
                                </div>
                                <input
                                    type='text'
                                    id={`title${index}`}
                                    name='title'
                                    value={question.title}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="form-control"
                                />
                            </div>
                            <div className="exam-row q-mark">
                                <label htmlFor={`mark${index}`} className="form-label text-capitalize">Mark</label>
                                <input
                                    type='text'
                                    id={`mark${index}`}
                                    name='mark'
                                    value={question.mark}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="form-control"
                                />
                            </div>
                            <div className="exam-row question-type">
                                <label htmlFor={`questionType${index}`} className="form-label text-capitalize">Question Type</label>
                                <select
                                    name='questionType'
                                    value={question.questionType}
                                    onChange={(e) => handleInputChange(index, e)}
                                    id={`questionType${index}`}
                                    className="form-select"
                                >
                                    <option value="" hidden>Select type</option>
                                    <option value="Multiple choice">Multiple choice</option>
                                    <option value="True/False">True/False</option>
                                    <option value="Short answer">Short answer</option>
                                </select>
                            </div>
                            <div className="exam-row image-upload position-relative">
                                <label className="form-label text-capitalize d-block">Image Upload</label>
                                <label htmlFor={`imageUpload${index}`} className='label-upload'>
                                    <RiUploadCloud2Line className='icon' />
                                    <input type='text' className="form-control" value={question.imageName} readOnly />
                                </label>
                                <input
                                    type="file"
                                    name='image'
                                    onChange={(e) => handleImageChange(index, e)}
                                    id={`imageUpload${index}`}
                                    className="form-control"
                                    accept="image/*" />
                            </div>

                            {/* Multiple choices */}
                            {question.questionType === 'Multiple choice' && (
                                <div className="exam-row multiple-choice">
                                    <div className="exam-row option1">
                                        <div className='for-mobile'>
                                            <button onClick={(e) => handleRemoveCorrectOption(index, e.target.value)} className='remove-icon d-none'>
                                                <TfiTrash className='icon' />
                                            </button>
                                            <label className="form-label text-capitalize">Option</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor={`correctOption${index}`} className="option-button">
                                                <div className="correct-btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                                <input
                                                    type="text"
                                                    id={`correctOption${index}`}
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                                                    className="option-input form-control correctOption"
                                                />
                                                <textarea
                                                    id={`correctOption${index}`}
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                                                    className="option-area form-control d-none"></textarea>
                                            </label>
                                            <button onClick={(e) => handleRemoveCorrectOption(index, e.target.value)} className='remove-icon'>
                                                <TfiTrash className='icon' title='Delete option' />
                                            </button>
                                        </div>
                                    </div>

                                    {question.falseOptions.map((option, optionIndex) => (
                                        <div key={optionIndex} className="exam-row option2">
                                            <div className='for-mobile'>
                                                <div className='option-icons d-none'>
                                                    <button onClick={() => handleRemoveIncorrectOption(index, optionIndex)} className='remove-icon'>
                                                        <TfiTrash className='icon' />
                                                    </button>
                                                    <button onClick={(e) => handleAddIncorrectOption(index, e)} className='add-icon'>
                                                        <IoAddCircleOutline className='icon' />
                                                    </button>
                                                </div>
                                                <label className="form-label text-capitalize">Option {optionIndex + 1} </label>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <label htmlFor={`falseOptions${index}`} className="option-button">
                                                    <div className="wrong-btn"><span><FaRegTimesCircle className='icon' /></span> Wrong answer</div>
                                                    <input
                                                        type="text"
                                                        id={`falseOptions${index}`}
                                                        value={option}
                                                        onChange={(e) => handleIncorrectOptionChange(index, optionIndex, e.target.value)}
                                                        className="option-input form-control falseOptions" />
                                                    <textarea
                                                        id={`falseOptions${index}`}
                                                        value={option}
                                                        onChange={(e) => handleIncorrectOptionChange(index, optionIndex, e.target.value)}
                                                        className="option-area form-control d-none"
                                                    ></textarea>
                                                </label>
                                                <button onClick={() => handleRemoveIncorrectOption(index, optionIndex)} className='remove-icon'>
                                                    <TfiTrash className='icon' title='Delete option' />
                                                </button>

                                                <button onClick={(e) => handleAddIncorrectOption(index, e)} className='add-icon'>
                                                    <IoAddCircleOutline className='icon' title='Add option' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                            {/* Multiple choices */}

                            {/* Short answer */}
                            {question.questionType === 'Short answer' && (
                                <div className="exam-row answer">
                                    <label htmlFor={`answer${index}`} className="form-label text-capitalize">Answer</label>
                                    <label className="option-button">
                                        <div className="correct-btn btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                        <textarea
                                            id={`answer${index}`}
                                            name='answer'
                                            value={question.answer}
                                            onChange={(e) => handleInputChange(index, e)}
                                            className="answer-input form-control"
                                        ></textarea>
                                    </label>
                                </div>
                            )}
                            {/* Short answer */}

                            {/* True/False */}
                            {question.questionType === 'True/False' && (
                                <div className="exam-row multiple-choice">
                                    <div className="exam-row option1">
                                        <div className='for-mobile'>
                                            <button className='remove-icon d-none'>
                                                <TfiTrash className='icon' />
                                            </button>
                                            <label htmlFor={`correctOption${index}`} className="form-label text-capitalize">True</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor={`correctOption${index}`} className="option-button">
                                                <div className="correct-btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                                <input
                                                    type="text"
                                                    name="correctOption"
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                                                    id={`correctOption${index}`}
                                                    className="option-input form-control correctOption"
                                                />
                                                <textarea
                                                    id={`correctOption${index}`}
                                                    name="correctOption"
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
                                                    className="option-area form-control d-none"></textarea>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="exam-row option2" style={{ width: '95%' }}>
                                        <div className='for-mobile'>
                                            <div className='option-icons d-none'>
                                                <button className='remove-icon'>
                                                    <TfiTrash className='icon' />
                                                </button>
                                                <button className='add-icon'>
                                                    <IoAddCircleOutline className='icon' />
                                                </button>
                                            </div>
                                            <label className="form-label text-capitalize">False</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label className="option-button" htmlFor='wrong'>
                                                <div className="wrong-btn"><span><FaRegTimesCircle className='icon' /></span> Wrong answer</div>
                                                <input
                                                    type="text"
                                                    name={`falseOptions${index}`}
                                                    value={question.falseOptions}
                                                    onChange={(e) => handleIncorrectOptionChange(index, 0, e.target.value)}
                                                    id='wrong'
                                                    className="option-input form-control falseOptions" />
                                                <textarea
                                                    id='wrong'
                                                    name={`falseOptions${index}`}
                                                    value={question.falseOptions}
                                                    onChange={(e) => handleIncorrectOptionChange(index, 0, e.target.value)}
                                                    className="option-area form-control d-none"
                                                ></textarea>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* True/False */}

                        </div>
                    </div>
                    <div className="btn-form">
                        {questionData.length > 1 && (
                            <button onClick={(e) => handleRemoveQuestion(index, e)} className='remove-icon remove-icon-from ms-3'>
                                <TfiTrash className='icon' title='Delete form' />
                            </button>
                        )}

                        <div className='add-question ms-3'>
                            <span className='text-capitalize text-light me-3'>Add Question</span>
                            <button onClick={(e) => handleAddQuestion(e)} className='add-icon'>
                                <IoAddCircleOutline className='icon' title='Add' />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </form>
    );
}
export default React.memo(ExamForm);