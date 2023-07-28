import React from 'react';

const TableExcelData = ({ data }) => {
    
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
 
  const headers = Object.keys(data[0]);

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

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>
                {/* {row[header]} */}
                {((header.includes('시간') && row[header] !== undefined) ||(header.includes('시각') && row[header] !== undefined) || (header.includes('일시')) && row[header] !== undefined) ? formatDate(row[header]) : row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableExcelData;