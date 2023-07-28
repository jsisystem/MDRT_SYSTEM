import React, { useState } from 'react';
import TableExcelData from '../components/TableExcelData';
import Footer from "../components/Footer";
import axios from 'axios';
import * as XLSX from 'xlsx';

function DataImport(){

    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState(null);
  
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
  
    const handleViewData = (e) => {
      e.preventDefault();
  
      console.log(selectedFile)

        if (selectedFile) {
            const reader = new FileReader();

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
                <form >
                  <input type="file" accept=".xlsx" onChange={handleFileUpload} />
                  <button 
                    style={{ margin:"20px"}}
                    onClick={(e) => {
                      handleViewData(e);
                    }}
                  >
                    데이터 불러오기
                  </button>
                  <button 
                    style={{ margin:"20px"}}
                    onClick={(e) => {
                      handleUploadFile(e);
                    }}
                  >
                    파일 Import 하기
                  </button>
  
                </form>
                <div className="table-container">
                  {console.log(data)}  
                  {data && <TableExcelData data={data} />}
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