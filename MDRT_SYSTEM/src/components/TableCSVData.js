import React, { useState } from 'react';

const TableCSVData = ({csvData}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(csvData.length / itemsPerPage);

  const startIndex = (currentPage -1 ) * itemsPerPage;
  const endIndex = startIndex + 1 + itemsPerPage;

  const currentPageData = csvData.slice(startIndex +1, endIndex);

  if (!csvData || csvData.length === 0) {
    return <p>No data available.</p>;
  } 

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th/>
            { csvData[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
         {currentPageData.map((row, rowIndex) => (                          
            <tr key={rowIndex}>
              <td>{startIndex + rowIndex + 1}</td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <div>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous  
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default TableCSVData;