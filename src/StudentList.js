import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from './userSlice';
import { EditStudentModal } from './EditStudentModal';

export function StudentList({ searchTerm }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.user.users);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        // Студент успешно удален!
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <p className="name-header">Name</p>
        <p className="email-header">Email</p>
        <p className="number-header">Number</p>
        <p className="action-header">Actions</p>
      </div>
      <ul>
        {students.filter(student => 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone.includes(searchTerm)
        ).map((student, index) => (
          <li key={index} className="student-list-item">
            <p className="name">{student.name}</p>
            <p className="email">{student.email}</p>
            <p className="number">{student.phone}</p>
            <div className="actions">
              <span onClick={() => handleDelete(student.id)} className="delete-icon">🗑️</span>
              <span className="edit-icon"><EditStudentModal student={student} /></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}