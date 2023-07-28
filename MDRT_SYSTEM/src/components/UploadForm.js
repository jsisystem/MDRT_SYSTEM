import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(props.uploadDataName)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('filename', props.uploadDataName);
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
    <div>
      <h1>Excel File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;