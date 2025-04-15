// StudentForm.js
import React, { useState } from 'react';
import { addStudent } from '../api';

function StudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { name, age: parseInt(age), email, major, gpa: parseFloat(gpa) };
    const result = await addStudent(newStudent);
    onAdd(result.data);
    setName('');
    setAge('');
    setEmail('');
    setMajor('');
    setGpa('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)} required />
      <input placeholder="GPA" value={gpa} onChange={(e) => setGpa(e.target.value)} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;