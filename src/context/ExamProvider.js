import React, { createContext, useState } from "react";
//import ExamContext from "./ExamContext";
import { db } from "../db";

export const ExamContext = createContext();

const ExamProvider = ({ children }) => {
    const [examData, setExamData] = useState({
       courseId: '',
        courseName: '',
        level: '',
        fullMark: '',
        date: '',
        time: '',
        duration: '',
        durationTime: 'hour',
        questions: [],
    })

    const addQuestion = (question) => {
        setExamData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, question]
        }))
    }

    // Save the examData to IndexDB
    const saveExamDataToDB = async () => {
        await db.exams.put(examData);
        console.log('Exam data saved to IndexedDB')
    }

    // Load exam data from IndexedDB
    const loadExamDataFromDB = async (courseId) => {
        try {
            console.log('Loading exam data for courseId:', courseId);
            console.log('Loading exam data for courseId:', typeof courseId);
            const savedData = await db.exams.where({courseId}).first();
            console.log('Saved exam data:', savedData);
            return savedData || null; // If no data is found, return null
        } catch (error) {
            console.error('Error loading exam data from IndexedDB:', error);
            return null;
        }
    };
    

    return (
        <ExamContext.Provider value={{ examData, setExamData, addQuestion, saveExamDataToDB, loadExamDataFromDB }}>
            {children}
        </ExamContext.Provider>
    )
}
export default ExamProvider;