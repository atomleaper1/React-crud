import React, { useState, useEffect } from 'react';
import Card from './Card';
import './styles.css';
import axios from 'axios';


function Hamrolist() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [editId, setEditId] = useState(null);

  const API_URL = 'https://6893787ac49d24bce86ae6d5.mockapi.io/api/students/students';

  const fetchStudents = () => {
    axios.get(API_URL)
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const studentData = { name, address, rollNo };

    if (editId) {
      axios.put(`${API_URL}/${editId}`, studentData)
        //''le variable value dinxa
      
        //error lai
        .then(() => {
          fetchStudents();
          setName('');
          setAddress('');
          setRollNo('');
          setEditId(null);
        })
        .catch(err => console.error("Error updating student:", err));
    } else {
      axios.post(API_URL, studentData)
        .then(() => {
          fetchStudents();
          setName('');
          setAddress('');
          setRollNo('');
        })
        .catch(err => console.error("Error adding student:", err));
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setAddress(student.address);
    setRollNo(student.rollNo);
    setEditId(student.id);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //error ko lai
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>List api ko</h2>
      <form onSubmit={saveStudent} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={e => setRollNo(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update Student' : 'Add Student'}</button>
      </form>

      <div className="card-container">
        {students.map((student, index) => (
          <div key={index}>
            <Card student={student} />
            <button onClick={() => editStudent(student)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hamrolist;
