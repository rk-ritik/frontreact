import React, { useState } from 'react'

function Pagination() {
  // Take the array of names
  const names = [
	"Ritik", "Aman", "Priya", "Neha", "Vikas",
	"Rohan", "Simran", "Kabir", "Sneha", "Mehul",
	"Arjun", "Nisha", "Mohit", "Kiran", "Sagar",
	"Reena", "Deepak","Ritik", "Aman", "Priya", "Neha", "Vikas",
	"Rohan", "Simran", "Kabir", "Sneha", "Mehul",
	"Arjun", "Nisha", "Mohit", "Kiran", "Sagar",
	"Reena", "Deepak"
];
 
 const totalItems = names.length;
 const itemsPerPage = 5;

 const totalPages = Math.ceil(totalItems / itemsPerPage);

 const [currentPage, setCurrentPage] = useState(1);
 const start = (currentPage - 1) * itemsPerPage;
 const end = start + itemsPerPage;
                                    
 const currentItems = names.slice(start, end);

  const currentListItems = currentItems.map((name,index) => (
    <li key={index}> {name} </li>
  ))

  return (
    <>
      <h1>Pagination  Names........</h1>
      <ul>
        {currentListItems}
      </ul>

       <button>Next</button>
       {Array.from({ length: totalPages }, (_,index) => (
          
             <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
          ))
       }
        <button>Previous</button>


    </>
  )
}

export default Pagination
