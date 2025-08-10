import React, { useState, useEffect } from 'react';
import Card from './Card';
import './styles.css';
import axios from 'axios';

function Hamrolist() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = () => {
    axios.get('https://6893787ac49d24bce86ae6d5.mockapi.io/api/students/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents(); // runs once after component mounts
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

return (
  <div>
    <h2>List api ko</h2>
    <div className="card-container">
      {students.map((student, index) => (
        <Card key={index} student={student} />
      ))}
    </div>
  </div>
);


}

export default Hamrolist;
