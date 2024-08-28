import React from "react";
import ExamItem from "./ExamItem";

const ExamList = ({exams, title}) => {
    return (
        <div 
        className="exam-list"
        id={title === "Previous Exams" ? "previous-exams" : "upcoming-exams"}
        >
            <h2>{title}</h2>
            {exams.map((exam, index) => (
                <ExamItem key={index} exam={exam}/>
            ))}
        </div>
    )
}
export default ExamList;