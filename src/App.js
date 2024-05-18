import React, { useState } from 'react';
import { AddStudentModal } from './AddStudentModal';
import { StudentList } from './StudentList';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h1 style={{ fontWeight: 'bold' }}>STUDENT LIST</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <input 
              type="text" 
              placeholder="Поиск по имени..." 
              style={{ borderRadius: '15px', padding: '5px', width: '200px', height: '23px', paddingLeft: '30px' }} 
              onChange={event => setSearchTerm(event.target.value)}
            />
            <span role="img" aria-label="search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'gray' }}>🔍</span>
          </div>
          <AddStudentModal />
        </div>
      </header>
      <StudentList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
