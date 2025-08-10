import React, { useState, useEffect } from "react";
import Card from "./Card";

function Hamrolist() {
  const [array, setarray] = useState([]);

  useEffect(() => {
    fetch('https://6893787ac49d24bce86ae6d5.mockapi.io/api/students/students')
      .then(response => response.json())
      .then(data =>setarray(data))
      
  .catch(error => console.error('Bigryo shitt', error));
  }, []);

  return (
    
    <div>
      <h2>List api ko</h2>
      {array.map((array, index) => (
        <div key={index}>
          <p>{array.id}. Name: {array.name}</p>
          <p>rollno: {array.rollno}</p>
          <p>address: {array.address}</p>
          <p>age: {array.age}</p>
          
        </div>
      ))}
    </div>
  );
}

export default Hamrolist;