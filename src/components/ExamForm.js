import React, { useCallback, useContext, useEffect, useState } from 'react'
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { ExamContext } from '../context/ExamProvider';

function ExamForm() {
    const { examData, setExamData } = useContext(ExamContext)

    const [questions, setQuestions] = useState(examData.questions || [{
        questionText: '',
        mark: '',
        questionType: '',
        image: null,
        imageName: '',
        correctOption: '',
        incorrectOptions: [''],
        answer: '',
        paragraph: '',
    }])

    useEffect(() => {
        if (examData.questions && examData.questions.length > 0) {
            setQuestions(examData.questions);
        } else {
            setQuestions([{
                questionText: '',
                mark: '',
                questionType: '',
                image: null,
                imageName: '',
                correctOption: '',
                incorrectOptions: [''],
                answer: '',
                paragraph: '',
            }]);
        }
    }, [examData.courseName]);

    useEffect(() => {
        setExamData(prevData => ({
            ...prevData,
            questions: questions
        }));
    }, [questions, setExamData]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value
        setQuestions(newQuestions)
    }

    const handleImageChange = ((index, e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newQuestions = [...questions];
                newQuestions[index].image = reader.result; // save iamge as Base64
                newQuestions[index].imageName = file.name // image name
                setQuestions(newQuestions)
            }
            reader.readAsDataURL(file) // convert image to Base64
        }

    })

    // const handleQuestionTypeChange = (index, e) => {
    //     const newQuestions = [...questions];
    //     newQuestions[index].questionType = e.target.value;
    //     setQuestions(newQuestions);
    // };

    // const [inputImage, setInputImage] = useState('');
    // const handleImageChange = ((index, e) => {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const fileNmae = file.name;
    //         setInputImage(fileNmae)
    //     }
    //     setQuestions({
    //         ...questions,
    //         image: file
    //     })
    // })

    // const [showForm, setShowFrom] = useState(true);
    // const handleShowForm = () => {
    //     setShowFrom(false)
    // }

    const handleCorrectOptionCahnge = (index, value) => {
        const newQuestions = [...questions]
        newQuestions[index].correctOption = value
        setQuestions(newQuestions)

    }

    const handleIncorrectOptionCahnge = (index, optionIndex, value) => {
        const newQuestions = [...questions]
        newQuestions[index].incorrectOptions[optionIndex] = value;
        setQuestions(newQuestions)

    }

    // Add
    const handleAddIncorrectOption = useCallback((index, e) => {
        e.preventDefault();
        const newQuestions = [...questions]
        newQuestions[index].incorrectOptions.push('')
        setQuestions(newQuestions);

    }, [questions])

    const handleAddQuestion = ((e) => {
        e.preventDefault();

        const newQuestion = {
            questionText: '',
            mark: '',
            questionType: '',
            image: null,
            imageName: '',
            correctOption: '',
            incorrectOptions: [''],
            answer: '',
            paragraph: '',
        };

        //const updatedQuestions = [...questions, newQuestion];
        setQuestions([...questions, newQuestion]);
    })


    // Delete
    const handleRemoveQuestion = useCallback((index, e) => {
        e.preventDefault();
        const newQuestions = questions.filter((_, i) => i !== index)
        setQuestions(newQuestions)

    }, [questions])

    const handleRemoveCorrectOption = (questionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].correctOption = '';
        setQuestions(newQuestions)
    }

    const handleRemoveIncorrectOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].incorrectOptions = newQuestions[questionIndex].incorrectOptions.filter((_, i) => i !== optionIndex)
        setQuestions(newQuestions)
    }

    return (
        <form>
            {questions.map((question, index) => (
                <div key={index} className="question-container my-3 d-flex">
                    <div className='exam-item card border-dashed'>
                        <div className="card-body p-0 d-flex flex-wrap justify-content-between">
                            <div className="exam-row question">
                                <div className='for-mobile'>
                                    <button className='remove-icon d-none'>
                                        <TfiTrash className='icon' title='Delete form' />
                                    </button>
                                    <label htmlFor="examName" className="form-label text-capitalize">Question {index + 1}</label>
                                </div>
                                <input
                                    type='text'
                                    name='questionText'
                                    value={question.questionText}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="form-control"
                                />
                            </div>
                            <div className="exam-row q-mark">
                                <label htmlFor="examName" className="form-label text-capitalize">Mark</label>
                                <input
                                    type='text'
                                    name='mark'
                                    value={question.mark}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="form-control"
                                />
                            </div>
                            <div className="exam-row question-type">
                                <label htmlFor="questionType" className="form-label text-capitalize">Question Type</label>
                                <select
                                    name='questionType'
                                    value={question.questionType}
                                    onChange={(e) => handleInputChange(index, e)}
                                    id="questionType"
                                    className="form-select"
                                >
                                    <option value="" hidden>Select type</option>
                                    <option value="Multiple choices">Multiple choices</option>
                                    <option value="True/False">True/False</option>
                                    <option value="Fill in the blanks">Fill in the blanks</option>
                                    <option value="Short answer">Short answer</option>
                                    <option value="Paragraph">Paragraph</option>
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
                            {question.questionType === 'Multiple choices' && (
                                <div className="exam-row multiple-choice">
                                    <div className="exam-row option1">
                                        <div className='for-mobile'>
                                            <button className='remove-icon d-none'>
                                                <TfiTrash className='icon' />
                                            </button>
                                            <label className="form-label text-capitalize">Option</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label className="option-button" htmlFor='correct'>
                                                <div className="correct-btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                                <input
                                                    type="text"
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionCahnge(index, e.target.value)}
                                                    id='correct'
                                                    className="option-input form-control"
                                                />
                                                <textarea
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionCahnge(index, e.target.value)}
                                                    className="option-area form-control d-none"></textarea>
                                            </label>
                                            <button onClick={(e) => handleRemoveCorrectOption(index, e.target.value)} className='remove-icon'>
                                                <TfiTrash className='icon' title='Delete option' />
                                            </button>
                                        </div>
                                    </div>

                                    {question.incorrectOptions.map((option, optionIndex) => (
                                        <div key={optionIndex} className="exam-row option2">
                                            <div className='for-mobile'>
                                                <div className='option-icons d-none'>
                                                    <button className='remove-icon'>
                                                        <TfiTrash className='icon' />
                                                    </button>
                                                    <button className='add-icon'>
                                                        <IoAddCircleOutline className='icon' />
                                                    </button>
                                                </div>
                                                <label className="form-label text-capitalize">Option {optionIndex + 1} </label>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <label className="option-button" htmlFor='wrong'>
                                                    <div className="wrong-btn"><span><FaRegTimesCircle className='icon' /></span> Wrong answer</div>
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => handleIncorrectOptionCahnge(index, optionIndex, e.target.value)}
                                                        id='wrong'
                                                        className="option-input form-control" />
                                                    <textarea
                                                        value={option}
                                                        onChange={(e) => handleIncorrectOptionCahnge(index, optionIndex, e.target.value)}
                                                        className="option-area form-control d-none"
                                                    ></textarea>
                                                </label>
                                                <button onClick={() => handleRemoveIncorrectOption(index, optionIndex)} className='remove-icon'>
                                                    <TfiTrash className='icon' title='Delete option' />
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={(e) => handleAddIncorrectOption(index, e)} className='add-icon'>
                                        <IoAddCircleOutline className='icon' title='Add option' />
                                    </button>
                                </div>
                            )}
                            {/* Multiple choices */}

                            {/* Short answer */}
                            {question.questionType === 'Short answer' && (
                                <div className="exam-row answer">
                                    <label className="form-label text-capitalize">Answer</label>
                                    <label className="option-button">
                                        <div className="correct-btn btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                        <textarea
                                            name='answer'
                                            value={question.answer}
                                            onChange={(e) => handleInputChange(index, e)}
                                            className="answer-input form-control"
                                        ></textarea>
                                    </label>
                                </div>
                            )}
                            {/* Short answer */}

                            {/* Paragraph */}
                            {question.questionType === 'Paragraph' && (
                                <div className="exam-row answer">
                                    <label className="form-label text-capitalize">Paragraph</label>
                                    <label className="option-button">
                                        <div className="correct-btn btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                        <textarea
                                            name='answer'
                                            value={question.paragraph}
                                            onChange={(e) => handleInputChange(index, e)}
                                            className="answer-input form-control"
                                        ></textarea>
                                    </label>
                                </div>
                            )}
                            {/* Paragraph */}

                            {/* True/False */}
                            {question.questionType === 'True/False' && (
                                <div className="exam-row multiple-choice">
                                    <div className="exam-row option1">
                                        <div className='for-mobile'>
                                            <button className='remove-icon d-none'>
                                                <TfiTrash className='icon' />
                                            </button>
                                            <label className="form-label text-capitalize">True</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label className="option-button" htmlFor='correct'>
                                                <div className="correct-btn"><span><IoCheckmarkCircleOutline className='icon' /></span> Correct answer</div>
                                                <input
                                                    type="text"
                                                    name={`correctOption${index}`}
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionCahnge(index, e.target.value)}
                                                    id='correct'
                                                    className="option-input form-control"
                                                />
                                                <textarea
                                                    name={`correctOption${index}`}
                                                    value={question.correctOption}
                                                    onChange={(e) => handleCorrectOptionCahnge(index, e.target.value)}
                                                    className="option-area form-control d-none"></textarea>
                                            </label>
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
                                            <label className="form-label text-capitalize">False</label>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label className="option-button" htmlFor='wrong'>
                                                <div className="wrong-btn"><span><FaRegTimesCircle className='icon' /></span> Wrong answer</div>
                                                <input
                                                    type="text"
                                                    name={`incorrectOption${index}`}
                                                    value={question.incorrectOptions}
                                                    onChange={(e) => handleIncorrectOptionCahnge(index, 0, e.target.value)}
                                                    id='wrong'
                                                    className="option-input form-control" />
                                                <textarea
                                                    name={`incorrectOption${index}`}
                                                    value={question.incorrectOptions}
                                                    onChange={(e) => handleIncorrectOptionCahnge(index, 0, e.target.value)}
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
                    <button onClick={(e) => handleRemoveQuestion(index, e)} className='remove-icon remove-icon-from ms-3'>
                        <TfiTrash className='icon' title='Delete form' />
                    </button>
                    <div className='add-question ms-3'>
                        <span className='text-capitalize text-light me-3'>Add Question</span>
                        <button onClick={(e) => handleAddQuestion(e)} className='add-icon'>
                            <IoAddCircleOutline className='icon' title='Add' />
                        </button>
                    </div>
                </div>
            ))}
        </form>

    )
}
export default ExamForm