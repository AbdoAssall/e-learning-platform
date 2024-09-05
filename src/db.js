import Dexie from 'dexie';

export const db = new Dexie('ExamDatabase');


db.version(3).stores({
  exams: '++id, courseId, courseName, level, fullMark, date, time, duration, durationTime, questions', 
  courses: '++id, courseName'
});
