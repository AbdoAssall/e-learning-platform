import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ExamItem = ({ exam }) => {
    const navigate = useNavigate();

    const handleJoinExam = (e) => {
        e.preventDefault();
        if (exam && exam.id) {
            if (exam.isFinished) {
                navigate(`/exam-result/${exam.resultId}`);
            } else {
                navigate(`/online-exam/${exam.id}`);
            }
        } else {
            console.error("Exam data is not available");
        }
    };

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

    if (!exam) {
        return <div>Error: Exam data is not available</div>;
    }

    const isPreviousExam = exam.score !== undefined;

    return (
        <div className="row">
            <div className="col-12">
                <div className="exam-item card">
                    <div className="card-body p-0">
                        <ul className="exam-info mb-0 p-0">
                            <li className="exam-time">
                                <p><IoCalendarOutline className="icon" /> {format(exam.date, "EEEE, MMM do")}</p>
                                <p><CiAlarmOn className="icon" /> {formatTimeTo12Hour(exam.time)}</p>
                            </li>
                            <li className="exam-title">
                                <p>{exam.courses.title}</p>
                                <p><span>Instructor: </span> {exam.instructor || 'Mohammed Nour'}</p>
                            </li>
                            <li className="exam-level">{`lev.${exam.level}`}</li>
                            <li className="exam-score">
                                {isPreviousExam ? (exam.score !== null ? `${exam.score}/${exam.fullMark}` : "NA") : "NA"}
                            </li>
                            <li className="mobile d-none w-100">
                                <ul className="d-flex justify-content-between p-0">
                                    <li className="exam-level">{`lev.${exam.level}`}</li>
                                    <li className="exam-score">
                                        {isPreviousExam ? (exam.score !== null ? exam.score : "NA") : "NA"}
                                    </li>
                                </ul>
                            </li>
                            <li className="exam-action">
                                <button onClick={(e) => handleJoinExam(e)} className="btn exam-btn">
                                    {isPreviousExam ? "View Result" : "Join Exam"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamItem;
