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

  const addStudent = (e) => {
    e.preventDefault();
    const newStudent = { name, address, rollNo };
    axios.post(API_URL, newStudent)
      .then(() => {
        fetchStudents();
        setName('');
        setAddress('');
        setRollNo('');
      })
      .catch(err => {
        console.error("Error adding student:", err);
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        fetchStudents();
      })
      .catch(err => {
        console.error("Error deleting student:", err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>List api ko</h2>

      <form onSubmit={addStudent} style={{ marginBottom: '20px' }}>
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
        <button type="submit">Add Student</button>
      </form>

      <div className="card-container">
        {students.map((student, index) => (
          <div key={index} className="card">
            <Card student={student} />
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hamrolist;
