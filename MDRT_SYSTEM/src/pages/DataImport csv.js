import React, { useState } from 'react';
import Footer from "../components/Footer";
import axios from 'axios';
import * as XLSX from 'xlsx';

function DataImport(){

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState(null);
  
    const fileReader = new FileReader();
  
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
  
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
  
      setArray(array);
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const decoder = new TextDecoder('EUC-KR');
          const text = decoder.decode(event.target.result);
          csvFileToArray(text);
        };
  
        //fileReader.readAsText(file);
        fileReader.readAsArrayBuffer(file);
      }
    };
  
    const headerKeys = Object.keys(Object.assign({}, ...array));
    
    //CSV 파일 DB Insert 
    // const handleOnDBInsert = (e) => {
    //   e.preventDefault();
    //   array.map((item, idx)=>(
    //       axios.post('/dbinsert/bus_schedule', Object.values(item))
    //       //axios.post('/dbinsert', item)
    //       .then(function (res) {
    //           console.log(res);         
    //         })
    //         .catch(function (error) {
    //           console.log(error);        
    //         })
    //   ))  
    // };
  
    const handleEdit = (rowIdx, column) => {
      //console.log("handle edit : " + rowIdx + column);
      setEditing({ rowIdx, column });
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      // console.log(editValue)
      // console.log(editing)
      // console.log(array)
      if(editValue === null){
        cancelEdit();
        return;
      }
      const { rowIdx, column} = editing;
      array[rowIdx][column] = editValue;
      setEditValue(null);
      //console.log(array)
      setEditing(null);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        cancelEdit();
      }
    };
  
    const cancelEdit = () => {
      setEditing(null);
      setEditValue(null);
    };
  
    return (
      <div className="contents-container">
        <div className="cont-box"> 
          <div>
            <div className="substance">
              <div className="sbs-inner">
                <form >
                  <input 
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                  />
                  <button 
                    style={{ margin:"20px"}}
                    onClick={(e) => {
                      handleOnSubmit(e);
                    }}
                  >
                    데이터 불러오기
                  </button>
                  <button 
                    style={{ margin:"20px"}}
                    onClick={(e) => {
                      handleOnSubmit(e);
                    }}
                  >
                    파일 Import 하기
                  </button>
  
                  {/* <button 
                    style={{ margin:"20px"}}
                    onClick={(e) => {
                      handleOnDBInsert(e);
                    }}
                  > 
                    Data DB Insert
                  </button>*/}
  
                </form>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr key={"header"}>
                        {headerKeys.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        array.map((row, rowIdx)=>(
                          <tr key={rowIdx}>
                            {headerKeys.map((column, colIdx) => (
                              <td
                                style={{ whiteSpace: 'pre-wrap' }} 
                                key={column}
                                onKeyDown={(e) => handleKeyDown(e)}                                                            
                                onClick={(e) => { handleEdit(rowIdx, column)}} 
                                tabIndex="0"  
                              >
                                {editing?.rowIdx === rowIdx && editing?.column === column ? (
                                    <form onSubmit={(e) => handleSave(e)}>
                                      <input type="text" defaultValue={row[column]} onChange={(e) => setEditValue(e.target.value)} />
                                      <button  style={{ margin:"20px"}} type="submit">Submit</button>
                                    </form>
                                  ) : (
                                    row[column]
                                  )}
                              </td>
                            ))}
                          </tr>
                        ))
                      }                    
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }


export default DataImport;