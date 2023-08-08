import { useState } from "react";
import axios from 'axios';
import YearMonthComboBox from "../components/YearMonthCombo";
import Footer from "../components/Footer";
import * as XLSX from 'xlsx';

const ITEMS_PER_PAGE = 10; // 페이지당 보여줄 행 수

function DataItem({ item, index, onView }) {
    const handleView = () => onView(index);
    return (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.searchDate}</td>
        <td>{item.dataName}</td>
        <td>{item.okayState}</td>  
        <td>
            {item.okayState === '승인' ?(
                <button type="button" className="button" onClick={handleView}>확인하기 버튼</button>
            ) : (
                '-'
            )
            }
        </td>
        <td>{item.memo}</td> 
      </tr>
    );
}

function DataView(){

    const id = sessionStorage.getItem('id');
    const permission = sessionStorage.getItem('permission');

    const [startYear, setStartYear] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [endYear, setEndYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [detailViewFlag, setDetailViewFlag] = useState(false);
    const [data, setData] = useState([]);
    const [dataIndex, setDataIndex] = useState([]);
    const [detailData, setDetailData] = useState([]);
    const [thData, setThData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const countingTime=()=>{

        if (startYear === '' || startMonth === ''|| endYear === ''|| endMonth === '') return false;
        if (startYear > endYear) return false;
        if ((startYear === endYear) && (startMonth > endMonth)) return false;

        return true;
    }

    const onSearch =  () => {

        if (!countingTime()) {
            alert("검색 날짜 선택을 바르게 해주세요!");
            return;
        } 

        if (detailViewFlag) {
            setDetailViewFlag(false);
        } 

        axios.post('/AnalDataView', {            
                id: id,   
                permission: permission,             
                startYear:startYear,
                StartMonth:startMonth,
                endYear:endYear,
                endMonth:endMonth
        })
        .then(function (res) {
        //console.log(res, res.status ,  res.data.length);  
            if( res.status === 200 && res.data.length > 0){ 
                setData(res.data);
            }else if( res.status === 200 && res.data.length === 0){                
                alert('검색된 데이터가 없습니다.');
            }else{                
                alert('API 통신 오류 입니다. ');
            }
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error);
        });          
    };     

    const handleView = (index) => {
        //console.log(index);
        setDataIndex(index);
       //console.log(`/ProvidedData/${index+1}`);       

        axios.post('/AnalDataDetailView', {
            id: id,
            permission:permission,
            fileName: data[index].dataName,
            date:data[index].date,            
        })
        .then(function (res) {
            //console.log(res)
            if( res.status === 200 && res.data.length > 0){ 
                const viewThData = res.data.filter((_, index) => index === 0);
                const viewTdData = res.data.filter((_, index) => index !== 0);
                setThData(viewThData);
                setDetailData(viewTdData);              
                //console.log(res,  res.data);
                //setExportData(res.data);
                setDetailViewFlag(true);
            }else if( res.status === 200 && res.data.length === 0){                
                alert('검색된 데이터가 없습니다.');
            }else{                
                alert('API 통신 오류 입니다.');
            }
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error);
        });    
    }

    const onFileExport = (e) =>{
        const fileType = e.target.id;

        if (fileType === 'CSV') {
            exportCSV();
          } else if (fileType === 'Excel') {
            exportExcel();
          }

    }

    // Function to export table data as CSV
  const exportCSV = () => {
    //const csvData = thData.concat(detailData).map((row) => Object.values(row));
    
    const csvData = thData.concat(detailData).map((row) => {
        // 시간값을 문자열로 변환하여 반환합니다.
        return Object.values(row).map((value) => {
          return typeof value === 'number' ? value.toString() : value;
        });
      });

    const csvDataString = csvData.map((row) => row.join(',')).join('\n');
    const csvBlob = new Blob([csvDataString], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.setAttribute('href', csvUrl);

    link.setAttribute('download', `${data[dataIndex].dataName}.csv`);    
    link.click();
  };

  // Function to export table data as Excel
  const exportExcel = () => {
    const array = [thData[0], ...detailData]; 
    //const excelData = thData.concat(detailData).map((row) => Object.values(row));
    //console.log(excelData)
    const wb = XLSX.utils.book_new(); //엑셀파일생성
    const ws = XLSX.utils.json_to_sheet(array); // 시트생성
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 시트이름생성
    XLSX.writeFile(wb, `${data[dataIndex].dataName}.xlsx`); // 파일저장
  };

    const totalPages = Math.ceil((detailData.length) / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = detailData.slice(indexOfFirstItem, indexOfLastItem);

    return(
        <div className="contents-container">
            <div className="cont-box">
                <div>
                    <div className="substance">
                        <div className="sbs-inner">
                        <div className="int-gr flx-jc-sb-ai-cn mgb30">
                            <div className="flx-ai-cn" style={{gap: '25px'}}>
                                <div className="flx-ai-cn">
                                    <label className="form-label">시작 : </label>
                                    <YearMonthComboBox point={"start"} setStartYear={setStartYear} setStartMonth={setStartMonth}/>
                                </div> 
                                <div className="flx-ai-cn">
                                    <label className="form-label">~</label>
                                </div>
                                <div className="flx-ai-cn">
                                    <label className="form-label">종료 : </label>
                                    <YearMonthComboBox point={"end"} setEndYear={setEndYear} setEndMonth={setEndMonth}/>
                                </div> 
                            </div>
                            <button type="button" className="btn btn-primary sch-btn" onClick={onSearch} >조회</button>
                        </div>
                        <ul className="txt-list flx-ai-cn mgb10"></ul>
                        <div className="table-container">
                             {/* {console.log(data)}  */}
                            <table> 
                                <thead>
                                    <tr>
                                        <th>신청 일자</th>
                                        <th>검색 기간</th>
                                        <th>분석자료 명 <br/> (검색일_신청지역_분석자료명) </th>
                                        <th>승인상태</th>                                        
                                        <th>확인하기</th>
                                        <th>비고 <br/> (승인거부시 이유) </th>
                                    </tr>
                                </thead>                
                                <tbody>
                                {data.map((item, index) => (
                                    <DataItem 
                                        key={index} 
                                        item={item} 
                                        index={index} 
                                        onView={handleView} 
                                    />
                                ))}                                   
                                </tbody>
                            </table>
                        </div>
                        {                            
                            detailViewFlag?(
                                <>
                                    <ul className="txt-list flx-ai-cn mgb30"></ul>
                                    <h2>
                                        <b>{data[dataIndex].date}</b>에 수집된 <b>{data[dataIndex].dataName}</b>입니다. 총 {' '} 
                                        <b>{detailData.length}</b> 개 / <b>{totalPages}</b> page 
                                    </h2>
                                    <ul className="txt-list flx-ai-cn mgb10"></ul>
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th> 
                                                    {Object.values(thData[0]).map((value,index) => (
                                                        <th key={index}>{value}</th>
                                                    ))} 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((item, index) => (
                                                    <tr key={(index+1)+((currentPage-1)*ITEMS_PER_PAGE)}>
                                                        <td> {(index+1)+((currentPage-1)*ITEMS_PER_PAGE)}</td>
                                                        {/* <td>{Object.values(item)}</td> */}

                                                        {/* {Object.keys(item).map((key) => (
                                                            <td key={key}>{typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}</td>
                                                        ))} */}

                                                        {Object.values(item).map((value) => (
                                                            <td>{value}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>                                            
                                        </table>
                                        <br />
                                        {/* Pagination */}
                                        <div className="pagination">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={currentPage === index + 1 ? 'active' : ''}
                                            >
                                                {index + 1}
                                            </button>
                                            ))}
                                        </div>
                                        <br/>
                                        <div className="flx-ai-cn" style={{gap: '25px'}}>
                                            <div className="flx-ai-cn">
                                                <button type="button"  id = "CSV" onClick={onFileExport} > CSV 로 파일 내려받기 </button>
                                            </div> 
                                            <div className="flx-ai-cn">
                                                <button type="button" id = "Excel" onClick={onFileExport} > Excel 로 파일 내려받기</button>
                                            </div> 
                                        </div>
                                    </div>
                                </>
                            )
                             : 
                             null
                        }
                    </div>
                </div>
                <Footer/>
                </div>
            </div>
        </div>
    );
}

export default DataView;