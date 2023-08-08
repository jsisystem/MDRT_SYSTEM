import React, { useState } from 'react';

const TableCSVData = ({csvData}) => {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(csvData.length / itemsPerPage);

  //const [csvData, setCSVData] = useState([]);
    
  if (!csvData || csvData.length === 0) {
    return <p>No data available.</p>;
  }    
  console.log(csvData);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
    // Get the data for the current page
  const currentPageData = csvData.slice(startIndex, endIndex);

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
         {csvData.map((row, rowIndex) => (                          
            rowIndex > 0 ? 
            <tr key={rowIndex}>
            <td>{(rowIndex)+((currentPage-1)*itemsPerPage)}</td>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            </tr>
            :
            null
          ))}
        </tbody>
      </table>

    {/* <table>
      <thead>
        <tr>
          <th/>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{(rowIndex+1)+((currentPage-1)*itemsPerPage)}</td>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table> */}
          {/* Pagination controls */}
          <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous Page
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next Page
          </button>
        </div>

        </div>

  );
};

export default TableCSVData;