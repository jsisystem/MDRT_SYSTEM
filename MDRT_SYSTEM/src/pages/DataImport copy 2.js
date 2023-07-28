import React, { useState } from 'react';
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
  
    const handleFileView = () => {
        console.log(selectedFile)

        // if (selectedFile) {
        //     const reader = new FileReader();

        //     reader.onload = (e) => {
        //         const data = e.target.result;
        //         const workbook = XLSX.read(data, { type: 'binary' });

        //         // 이제 엑셀 파일의 데이터를 활용할 수 있습니다.
        //         // 예를 들어, 첫 번째 시트 데이터를 콘솔에 출력합니다.
        //         const firstSheetName = workbook.SheetNames[0];
        //         const firstSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
        //         setData(firstSheetData);
        //         console.log(firstSheetData);

        //     };

        //     reader.readAsBinaryString(selectedFile);
        //   }
      }

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
                        onClick={handleFileView}
                    >
                        데이터 불러오기
                    </button>
                    <button 
                        style={{ margin:"20px"}}
                        onClick={handleFileView}
                    >
                        파일 Import 하기
                    </button>
                </form>
                <div className="table-container">
                    {console.log(data)}
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