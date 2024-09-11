import Dexie from 'dexie';

export const db = new Dexie('ExamDatabase');


db.version(3).stores({
  exams: '++id, course_id, courses, level, fullMark, date, time, duration, instructor, questions, created_at', 
  courses: '++id, title, level, instructor, created_at',
  questions: '++id, exam_id, exams, correctOption, answered, answer, paragraph, score, timeSpent, falseOption, image, imageName, mark, questionType, title, created_at'
});
