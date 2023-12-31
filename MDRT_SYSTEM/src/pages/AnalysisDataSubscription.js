import { useEffect, useState } from "react";
import axios from 'axios';
import YearMonthComboBox from "../components/YearMonthCombo";
import { MultiSelect } from "react-multi-select-component";
import Footer from "../components/Footer";

function AnalysisDataSubscription(){

    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [selected3, setSelected3] = useState([]);

    const [cities, setCities] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    const [business, setBusiness] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState([]);

    const [routes, setRoutes] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const [message, setMessage] = useState([]);

    useEffect(() => {
        async function fetchCities() {
            try {
              const response = await axios.post('/GetCity', {
                id: sessionStorage.getItem('id'),
                permission: sessionStorage.getItem('permission'),
              });
      
              if (response.status === 200 && response.data.length > 0) {
                const option = response.data.map((cityName) => ({ label: cityName, value: cityName }));
                setCities(option);
              } else {
                alert('검색된 데이터가 없습니다.');
              }
            } catch (error) {
              alert(error.response.data.error);
            }
          }
      
          fetchCities();
    }, []);

    useEffect(() => {
        //console.log(selected);

        setSelected2([]);       
        setSelected3([]);  
        setSelectedBusiness([]);     
        setSelectedRoutes([]);

        setSelectedCities([]);
        if(selected.length > 0) {
            selected.map((city)=>(setSelectedCities(prevSelectedCities=>[...prevSelectedCities,city.value])))
        }; 
    }, [selected]);

    useEffect(() => {
        // console.log(selected2);
        setSelected3([]);       
        setSelectedRoutes([]);
        setSelectedBusiness([]); 

        if(selected2.length > 0) {
            selected2.map((business)=>(setSelectedBusiness(prevSelectedBusiness=>[...prevSelectedBusiness,business.value])));
        };        
     
    }, [selected2]);

    useEffect(() => {
        // console.log(selected3);
        setSelectedRoutes([]);

        if(selected3.length > 0) {
            selected3.map((route)=>(setSelectedRoutes(prevSelectedRoutes=>[...prevSelectedRoutes,route.value])));
        };       
     
    }, [selected3]);

    useEffect(() => {
        if (selectedCities.length === 0) {
          return;
        }
    
        async function fetchBusiness() {
          try {
            const response = await axios.post('/GetBusiness', {
              city: selectedCities,
              id: sessionStorage.getItem('id'),
              permission: sessionStorage.getItem('permission'),
            });
    
            if (response.status === 200 && response.data.length > 0) {
              const option = response.data.map((businessName) => ({ label: businessName, value: businessName }));
              setBusiness(option);
            } else {
              alert('검색된 데이터가 없습니다.');
            }
          } catch (error) {
            alert(error.response.data.error);
          }
        }
    
        fetchBusiness();
      }, [selectedCities]);

      useEffect(() => {
        if (selectedBusiness.length === 0 || selectedCities.length === 0) {
          return;
        }
    
        async function fetchRoutes() {
          try {
            const response = await axios.post('/GetRoutes', {
              city: selectedCities,
              business: selectedBusiness,
              id: sessionStorage.getItem('id'),
              permission: sessionStorage.getItem('permission'),
            });
    
            if (response.status === 200 && response.data.length > 0) {
              const option = response.data.map((businessName) => ({ label: businessName, value: businessName }));
              setRoutes(option);
            } else {
              alert('검색된 데이터가 없습니다.');
            }
          } catch (error) {
            alert(error.response.data.error);
          }
        }
    
        fetchRoutes();
      }, [selectedBusiness, selectedCities]);

    useEffect(() => {
        setMonth('');
    }, [year]);

    // useEffect(() => {

    // }, [month]);

    const onRequest =  () => {
        if (year === '' || month === '') {
            alert("검색 날짜 선택을 바르게 해주세요!");
            return;
        } 

        //분석자료 신청하기
        async function fetchSubscription() {
      try {
        const response = await axios.post('/DataSubscription', {
          city: selectedCities,
                business: selectedBusiness,
                routes: selectedRoutes,
                year:year,
                month:month,
                id:sessionStorage.getItem('id'),
                permission:sessionStorage.getItem('permission')
        });

        if (response.status === 200 && response.data.length > 0) {
          console.log(response.data);   
          //setMessage(res.data);
          const msg = ` ${year} 년 ${month} 월 지역 : ${selectedCities.join(',')} 사업자 : ${selectedBusiness.join(',')} 노선 : ${selectedRoutes.join(',')} 의 분석데이터 요청이 완료 되었습니다. ` ;
          //setMessage(msg);
          setMessage(prevMessage=>[...prevMessage, msg]);
        } else {
          alert('검색된 데이터가 없습니다.');
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    }

        fetchSubscription();    
    };  
    
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
                                    {/* {console.log(cities)}                                                                      */}
                                    <MultiSelect
                                        options= {cities}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                        hasSelectAll={true}
                                    />
                                </div>
                                <div className="flx-ai-cn">
                                    <label className="form-label">사업자</label> 
                                    {/* {console.log(business)}                                                                      */}
                                    <MultiSelect
                                        options= {business}
                                        value={selected2}
                                        onChange={setSelected2}
                                        labelledBy="Select"
                                        hasSelectAll={true}
                                    />
                                </div>
                                <div className="flx-ai-cn">
                                    <label className="form-label">노선</label> 
                                    {/* {console.log(business)}                                                                      */}
                                    <MultiSelect
                                        options= {routes}
                                        value={selected3}
                                        onChange={setSelected3}
                                        labelledBy="Select"
                                        hasSelectAll={true}
                                    />
                                </div>
                                <div className="flx-ai-cn">
                                    <YearMonthComboBox setYear={setYear} setMonth={setMonth}/>
                                </div> 
                            </div>
                            <button type="button" className="btn btn-primary sch-btn" onClick={onRequest} > 요청 </button>
                        </div>
                        <ul className="txt-list flx-ai-cn mgb10">
                            <li>지역<b>{selectedCities.join(',')}</b></li>  
                            <li>사업자<b>{selectedBusiness.join(',')}</b></li>
                            <li>노선<b>{selectedRoutes.join(',')}</b></li>
                            <li>검색 년/월<b>{year} 년 {month} 월</b></li> 
                        </ul>
                        <ul className="txt-list flx-ai-cn mgb10"></ul>
                        <div className="chart-area"> 
                            <div>
                                {/* {console.log(message)} */}
                                { message ? message.map((msg, index)=>(
                                    <>
                                        <li key={index}><b>{msg}</b></li><br/>
                                    </>
                                )):null}
                            </div>                           
                        </div>
                    </div>    
                </div>
                <Footer/>
                </div>
            </div>
        </div>
    );
}

export default AnalysisDataSubscription;