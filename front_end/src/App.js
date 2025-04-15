// // App.js
// import React, { useState, useEffect } from 'react';
// import StudentForm from './components/StudentForm';
// import StudentList from './components/StudentList';
// import { getStudents } from './api';

// function App() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     getStudents().then((res) => setStudents(res.data));
//   }, []);

//   const addStudentToList = (student) => {
//     setStudents((prev) => [...prev, student]);
//   };

//   const removeStudentFromList = (id) => {
//     setStudents((prev) => prev.filter((student) => student.id !== id));
//   };

//   return (
//     <div>
//       <h1>Student Management System</h1>
//       <StudentForm onAdd={addStudentToList} />
//       <StudentList students={students} onDelete={removeStudentFromList} />
//     </div>
//   );
// }

// export default App;


// App.js
import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, addStudent } from './api';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((res) => setStudents(res.data));
  }, []);

  // Corrected function to handle adding a student
  const addStudentToList = async (student) => {
    try {
      const response = await addStudent(student);
      const newStudent = { ...student, id: response.data.id };
      setStudents((prev) => [...prev, newStudent]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const removeStudentFromList = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm onAdd={addStudentToList} />
      <StudentList students={students} onDelete={removeStudentFromList} />
    </div>
  );
}

export default App;
