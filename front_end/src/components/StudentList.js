// StudentList.js
import React from 'react';
import { deleteStudent } from '../api';

function StudentList({ students, onDelete }) {
  const handleDelete = async (id) => {
    await deleteStudent(id);
    onDelete(id);
  };

  return (
    <div>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
            <p>
              Name: {student.name} <br />
              Age: {student.age} <br />
              Email: {student.email} <br />
              Major: {student.major} <br />
              GPA: {student.gpa}
            </p>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No students available</p>
      )}
    </div>
  );
}

export default StudentList;
