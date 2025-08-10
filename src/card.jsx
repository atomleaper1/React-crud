import pfp from './assets/manxe.jpg'
import React from 'react'
import './styles.css'

function Card({student}){
    return(
        <div className="apicard">
            <img src={pfp} height={200}></img>
             <p>{student.id}. Name: {student.name}</p>
             <p>rollno: {student.rollno}</p>
             <p>address: {student.address}</p>
             <p>age: {student.age}</p>

        </div>     
    );
}
export default Card