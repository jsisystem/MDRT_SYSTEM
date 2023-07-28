import React, { useState } from 'react';

const TableExcelData = ({ data }) => {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
    
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
 
  const headers = Object.keys(data[0]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

   // 날짜 포맷팅 함수 (월과 분에 대한 값이 한 자리일 경우 앞에 0을 붙여주는 함수)
  const formatDate = (dateNumber) => {

    // console.log(typeof dateNumber);
    // console.log(dateNumber);
    
    if (!dateNumber) return ''; // Return empty string if dateString is null or empty

    let excelDateValue = parseFloat(dateNumber);
  
    // Check if dateString is a number
    if (isNaN(excelDateValue)) {
      // If dateString is not a valid number, return the original dateString
      return dateNumber;
    }
  
    // If dateString is a number, adjust for the Excel date system (1900) to JavaScript date system (1970)
    const jsDateValue = (excelDateValue - 25569) * 86400 * 1000;

    const timeZoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
      
    // Create Date object with the adjusted value and time zone offset
    const localDate = new Date(jsDateValue + timeZoneOffsetMs);
  
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

    // Get the data for the current page
    const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div>
    <table>
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
                  {((header.includes('시간') && row[header] !== undefined) ||(header.includes('시각') && row[header] !== undefined) || (header.includes('일시')) && row[header] !== undefined) ? formatDate(row[header]) : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      {/* <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>
                
                {((header.includes('시간') && row[header] !== undefined) ||(header.includes('시각') && row[header] !== undefined) || (header.includes('일시')) && row[header] !== undefined) ? formatDate(row[header]) : row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody> */}
    </table>
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

export default TableExcelData;