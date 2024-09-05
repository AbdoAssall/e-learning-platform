import React, { useState } from 'react';
import { db } from '../db';
import Navbar from '../components/Navbar';

const AddCourse = () => {
    const [courseName, setCourseName] = useState('');

    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value);
    };

    const handleAddCourse = async () => {
        if (courseName.trim() !== '') {
            await db.courses.put({ courseName });
            alert(`The course has been added: ${courseName}`);
            setCourseName(''); // reset input after added
        } else {
            alert('Please enter the course name');
        }
    };

    return (
        <div className="main-bg">
            <div className='container'>
                <Navbar />
                <div className="exam-section" id='exam-section'>
                    <div className="section-title">
                        <h4>Create new Course</h4>
                        <p>6th June 2023</p>
                    </div>
                    <div className="exam-item card add-card-exam">
                        <h4>Add New Course</h4>
                        <input
                            type="text"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            placeholder="Enter course name"
                        />
                        <div className="exam-from-btns mx-auto mt-3">
                            <button 
                            className='btn exam-btn text-uppercase' 
                            style={{width: '250px'}}
                            onClick={handleAddCourse}>Add Course</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AddCourse;