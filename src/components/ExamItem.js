import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";


const ExamItem = ({ exam }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="exam-item card">
                    <div className="card-body p-0">
                        <ul className="exam-info mb-0 p-0">
                            <li className="exam-time">
                                <p><IoCalendarOutline className="icon" /> {exam.date}</p>
                                <p><CiAlarmOn className="icon" /> {exam.time}</p>
                            </li>
                            <li className="exam-title">
                                <p>{exam.title}</p>
                                <p><span>Instructor: </span> {exam.instructor}</p>
                            </li>
                            <li className="exam-level">{exam.level}</li>
                            <li className="exam-score">
                                {exam.isUpcoming ? "NA" : exam.score}
                            </li>
                            <li className="mobile d-none w-100">
                                <ul className="d-flex justify-content-between p-0">
                                    <li className="exam-level">{exam.level}</li>
                                    <li className="exam-score">
                                        {exam.isUpcoming ? "NA" : exam.score}
                                    </li>
                                </ul>
                            </li>
                            <li className="exam-action">
                                {exam.isUpcoming ? (<button className="btn exam-btn">Join Exam</button>) :
                                    (<button className="btn exam-btn" disabled>Finished</button>)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ExamItem;