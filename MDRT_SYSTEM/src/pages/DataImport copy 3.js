import React, { useEffect, useState } from 'react';
import TableExcelData from '../components/TableExcelData';
import CSVReader from 'react-csv-reader';
import TableCSVData from '../components/TableCSVData';
import Footer from "../components/Footer";
import axios from 'axios';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

function DataImport(){

    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState(null);
    const [fileKind, setFileKind] = useState('Excel');
    const [array, setArray] = useState([]);

    const reader = new FileReader();

    const onHandleSelect = (e) =>{
      console.log(e.target.value)
      setSelectedFile(null);
      setFileKind(e.target.value);
    }
  
    const handleSelectedFile = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleFileLoaded = (data, fileInfo) => {
      setSelectedFile(data);
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
  
    const handleViewData = (e) => {
      e.preventDefault();

      console.log(selectedFile)
      console.log(fileKind)

      if (selectedFile) {
        if(fileKind === 'Excel'){

          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = XLSX.read(data, { type: 'binary' });

              // 이제 엑셀 파일의 데이터를 활용할 수 있습니다.
              // 예를 들어, 첫 번째 시트 데이터를 콘솔에 출력합니다.
              const firstSheetName = workbook.SheetNames[0];
              const firstSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
              setData(firstSheetData);
              console.log(firstSheetData);

          };
          reader.readAsBinaryString(selectedFile);
        }
        else if(fileKind === 'CSV'){
          console.log(fileKind);

          reader.onload  = (e) => {

            console.log(e.target.result);

            const decoder = new TextDecoder('EUC-KR');
            const text = decoder.decode(e.target.result);
            console.log(text);
            csvFileToArray(text);

      
            //reader.readAsText(file);
            reader.readAsArrayBuffer(selectedFile);
          }
          
        }
        else {
          console.log(`fileKind :  ${fileKind}`)
          return;
        }
      }
    };

    const handleUploadFile = (e) => {
      e.preventDefault();

      console.log(selectedFile.name)
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }  
      
      const specificCharacter = ".";
      const index = selectedFile.name.indexOf(specificCharacter);
      const fileName = index !== -1 ? selectedFile.name.substring(0, index) : selectedFile.name;

      console.log(fileName)
      
      const formData = new FormData();
      formData.append('id', localStorage.getItem('id')); // id 정보를 같이 넣어서 보냄
      formData.append('filename', fileName);
      formData.append('excelFile', selectedFile );      
  
      // 서버로 파일 전송
      axios.post('/uploadFile',formData)
        .then((res) => {
          if( res.status === 200 ){             
              alert('데이터 Upload가 완료 되었습니다.');
          }else{                
              alert('데이터 Upload가 실패 했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error uploading the file:', error);
        });
    };
  
    return (
      <div className="contents-container">
        <div className="cont-box"> 
          <div>
            <div className="substance">
              <div className="sbs-inner">
                <div className="int-gr flx-jc-sb-ai-cn mgb30">
                  {console.log(fileKind)} 
                  <div className="flx-ai-cn" style={{gap: '25px'}}>
                    <div className="flx-ai-cn">
                      <label className="form-label">파일 형식</label>
                      <select className="form-select" onChange={onHandleSelect}>                      
                        <option key={'Excel'} value={'Excel'}>Excel File</option>
                        <option key={'CSV'} value={'CSV'}>CSV File</option>
                      </select>
                      </div>
                    <div className="flx-ai-cn">
                      {fileKind === 'Excel' ?                       
                        <input type="file" accept=".xlsx" onChange={handleSelectedFile} />
                      :
                        <input type="file" accept=".csv" onChange={handleSelectedFile} />
                        // <CSVReader
                        //   onFileLoaded={handleFileLoaded}
                        //   inputStyle={{ color: 'black' }}
                        //   parserOptions={{
                        //     header: true,
                        //     skipEmptyLines: true,
                        //     encoding: 'UTF-8', // 인코딩 설정 추가
                        //   }}
                        // />
                      }
                      
                      <button 
                        style={{ margin:"20px"}}
                        onClick={(e) => {
                          handleViewData(e);
                        }}
                      >
                        데이터 불러오기
                      </button>
                    </div>
                    <div className="flx-ai-cn">
                      <button 
                        style={{ margin:"20px"}}
                        onClick={(e) => {
                          handleUploadFile(e);
                        }}
                      >
                        파일 Import 하기
                      </button>
                    </div>                    
                  </div>
                </div>
                <div className="table-container">
                  {console.log(fileKind)} 
                  {console.log(data)}  
                  {console.log(selectedFile)}
                  {(fileKind === 'Excel' ? (data ? <TableExcelData data={data} /> : null) :
                    console.log(Object.keys(Object.assign({}, ...array))), 
                    (selectedFile ?
                      <table>
                        <thead>
                          <tr key={"header"}>
                            {Object.keys(Object.assign({}, ...array)).map((column) => (
                              <th key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            array.map((row, rowIdx)=>(
                              <tr key={rowIdx}>
                                {Object.keys(Object.assign({}, ...array)).map((column, colIdx) => (
                                  <td key={column}>
                                    row[column]
                                  </td>
                                ))}
                              </tr>
                            ))
                          }                    
                        </tbody>
                      </table> : null
                    )
                  )}
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