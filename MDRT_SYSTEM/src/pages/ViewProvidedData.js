import { useEffect, useState } from "react";
import axios from 'axios';
import YearMonthComboBox from "../components/YearMonthCombo";
//import AlarmModal from "../components/AlarmModal";
import Footer from "../components/Footer";

const ITEMS_PER_PAGE = 10; // 페이지당 보여줄 행 수

function DataItem({ item, index, onView, onUpload }) {
    const handleView = () => onView(index);
    const handleUpload = () => onUpload(index);
    return (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.data}</td>
        <td>{item.approval}</td>
        <td>{item.checkDate || '-'}</td>  
        <td><button type="button" className="button" onClick={handleView}>확인하기 버튼</button></td>
        <td>{item.retryRequest === "yes" ? <button type="button" className="button" onClick={handleUpload}>데이터 재 수집 요청</button> : '-'}</td> 
      </tr>
    );
}

function ViewProvidedData(){

    const city = sessionStorage.getItem('city');
    const company = sessionStorage.getItem('company');

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const [detailViewFlag, setDetailViewFlag] = useState(false);

    const [data, setData] = useState([]);
    const [dataIndex, setDataIndex] = useState([]);

    const [detailData, setDetailData] = useState([]);
    const [thData, setThData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // const [modalOpen, setModalOpen] = useState(false);
    // const [requestData, setRequestData] = useState([]);

    // const closeModal = () => {
    //   setModalOpen(false);
    // };

    const initData = () =>{
        setData([]);
        setDetailData([]);
        setDetailViewFlag(false);
        setThData([]);
        setCurrentPage(1);
    } 

    useEffect(() => {
        setMonth('');
        initData();
    }, [year]);

    useEffect(() => {
        initData();
    }, [month]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onSearch =  () => {
        if (year === '' || month === '') {
            alert("검색 날짜 선택을 바르게 해주세요!");
            return;
        } 

        if (detailViewFlag) {
            setDetailViewFlag(false);
        } 

        axios.post('/ProvidedData', {            
                city: city,
                company: company,
                year:year,
                month:month,
        })
        .then(function (res) {
        //console.log(res, res.status ,  res.data.length);  
            if( res.status === 200 && res.data.length > 0){               
                //console.log(res,  res.data);   
                setData(res.data);
            }else{                
                alert('검색된 데이터가 없습니다.');
                //document.location.href = '/';
            }
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error);
        });          
    };     


    const managerMessage = () => {
        //메세지
         if(data.length === 0) return null;
        const reqMsg = data.filter(item => item.retryRequest === "yes");
        //console.log(reqMsg)
        return(
            <div>
                {reqMsg.map((item, index) => (
                    index === reqMsg.length-1 ? item.data + ' ': item.data + ',   '
                ))}
                데이터를 확인해 주시기 바랍니다. 
            </div>
        );
      };      

    const handleView = (index) => {
       //console.log(index);
        setDataIndex(index);
       //console.log(`/ProvidedData/${index+1}`);       

        axios.post(`/ProvidedData/${index+1}`, {
            city: city,
            company: company,
            year:year,
            month:month,
        })
        .then(function (res) {
            //console.log(res)
            if( res.status === 200 && res.data.length > 0){               
                //console.log(res,  res.data);
                const viewThData = res.data.filter((_, index) => index === 0);
                const viewTdData = res.data.filter((_, index) => index !== 0);
                setThData(viewThData);
                setDetailData(viewTdData);
                setDetailViewFlag(true);
            }else{                
                alert('검색된 데이터가 없습니다.');
            }
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error);
        });    
    }

    const handleUpload = (index) => {
        //const dataValue = data[index].data;
        //console.log(dataValue);
        axios.post('/ProvidedData/retryRequest', {
            city: city,
            company: company,
            date:data[index].date,
            data:data[index].data,            
        })
        .then(function (res) {
            //console.log(res)
            if( res.status === 200 ){             
                //console.log(res,  res.data);
                // setRequestData(data[index].data)
                // setModalOpen(true);  
                alert('데이터 재 수집 요청이 완료 되었습니다.');
            }else{                
                alert('데이터 재 수집 요청에 실패 했습니다.');
            }
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error);
        }); 
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
                                    <label className="form-label">지역</label>
                                    <input className="form-label" type="text" disabled value={sessionStorage.getItem('city')}  />
                                </div>
                                <div className="flx-ai-cn">
                                    <label className="form-label">사업자</label>
                                    <input className="form-label" type="text" readOnly value={sessionStorage.getItem('company')}  />
                                </div>
                                <div className="flx-ai-cn">
                                    <YearMonthComboBox setYear={setYear} setMonth={setMonth}/>
                                </div> 
                            </div>
                            <button type="button" className="btn btn-primary sch-btn" onClick={onSearch} >조회</button>
                        </div>
                        <ul className="txt-list flx-ai-cn mgb10">
                            <li>지역<b>{city}</b></li>  
                            <li>사업자<b>{company}</b></li> 
                            <li>검색 년/월<b>{year} 년 {month} 월</b></li> 
                        </ul>
                        <div className="chart-area">
                            <h2>관리자 요청 메세지입니다. </h2><br/>
                            {managerMessage()}
                        </div>
                        <ul className="txt-list flx-ai-cn mgb10"></ul>
                        <div className="table-container">
                             {/* {console.log(data)}  */}
                            <table> 
                                <thead>
                                    <tr>
                                        <th>데이터 수집 일</th>
                                        <th>등록할 데이터</th>
                                        <th>승인상태</th>
                                        <th>관리자 확인 날짜</th>                                        
                                        <th>확인하기</th>
                                        <th>데이터 재 수집 요청</th>
                                    </tr>
                                </thead>                
                                <tbody>
                                {data.map((item, index) => (
                                    <DataItem 
                                        key={index} 
                                        item={item} 
                                        index={index} 
                                        onView={handleView} 
                                        onUpload={handleUpload} 
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
                                        <b>{data[dataIndex].date}</b>에 수집된 <b>{data[dataIndex].data}</b>입니다. 총 {' '} 
                                        <b>{detailData.length}</b> 개 / <b>{totalPages}</b> page 
                                    </h2>
                                    <ul className="txt-list flx-ai-cn mgb10"></ul>
                                    <div className="table-container">
                                        <table>
                                        <thead>
                                            {/* {console.log(thData[0])} */}
                                            <tr>
                                                <td></td>
                                                <th> {thData[0].date}</th>
                                                <th> {thData[0].company}</th>
                                                <th> {thData[0].userID}</th>
                                                <th> {thData[0].routeID}</th>
                                                <th> {thData[0].vehicleID}</th>
                                                <th> {thData[0].driverID}</th>
                                                <th> {thData[0].boardingStopID}</th>
                                                <th> {thData[0].getOffStopID}</th>
                                                <th> {thData[0].realOffStopID}</th>
                                                <th> {thData[0].callResult}</th>
                                                <th> {thData[0].useResult}</th>
                                                <th> {thData[0].callLocation}</th>
                                                <th> {thData[0].destinationLocation}</th>
                                                <th> {thData[0].callTime}</th>
                                                <th> {thData[0].expectedBoardingTime}</th>
                                                <th> {thData[0].expectedOffTime}</th>
                                                <th> {thData[0].boardingTime}</th>
                                                <th> {thData[0].getOffTime}</th>
                                                <th> {thData[0].TransferDiscount}</th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((item, index) => (
                                                    <tr key={(index+1)+((currentPage-1)*ITEMS_PER_PAGE)}>
                                                        <td> {(index+1)+((currentPage-1)*ITEMS_PER_PAGE)}</td>
                                                        <td> {item.date}</td>
                                                        <td> {item.company}</td>
                                                        <td> {item.userID}</td>
                                                        <td> {item.routeID}</td>
                                                        <td> {item.vehicleID}</td>
                                                        <td> {item.driverID}</td>
                                                        <td> {item.boardingStopID}</td>
                                                        <td> {item.getOffStopID}</td>
                                                        <td> {item.realOffStopID}</td>
                                                        <td> {item.callResult}</td>
                                                        <td> {item.useResult}</td>
                                                        <td> {item.callLocation}</td>
                                                        <td> {item.destinationLocation}</td>
                                                        <td> {item.callTime}</td>
                                                        <td> {item.expectedBoardingTime}</td>
                                                        <td> {item.expectedOffTime}</td>
                                                        <td> {item.boardingTime}</td>
                                                        <td> {item.getOffTime}</td>
                                                        <td> {item.TransferDiscount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>                                            
                                        </table>
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
            {/* <AlarmModal open={modalOpen} close={closeModal} header={`${sessionStorage.getItem('id')} 님`}>
                    {requestData} 데이터 재 수집이 요청 되었습니다. 
            </AlarmModal> */}
        </div>
    );
}

export default ViewProvidedData;