import { useEffect, useState } from "react";
import axios from 'axios';
import YearMonthComboBox from "../components/YearMonthCombo";
import { MultiSelect } from "react-multi-select-component";
import Footer from "../components/Footer";
import UseCityData from "../hook/UseCityData";

function AnalysisDataSubscription(){

    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [selected3, setSelected3] = useState([]);

    //const [cities, setCities] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    const [business, setBusiness] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState([]);

    const [routes, setRoutes] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const [message, setMessage] = useState([]);

    const cities = UseCityData();
    console.log(cities);  

    // useEffect(() => {
    //     axios.post('/GetCity', {
    //         id:localStorage.getItem('id'),
    //         permission:localStorage.getItem('permission')   
    //     })
    //     .then(function (res) {
    //         //console.log(res, res.status ,  res.data.length);  
    //         if( res.status === 200 && res.data.length > 0){               
    //             //console.log(res.data); 
    //             const option = res.data.map(cityName => ({ label: cityName, value: cityName }));
    //             //const option = res.data.map(cityName => cityName.label);
    //             setCities(option)
    //         }else{                
    //             alert('검색된 데이터가 없습니다.');
    //         }
    //     })
    //     .catch(function (error) {
    //         alert(error.response.data.error);
    //     }); 
    // }, []);

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
        //console.log(selectedCities); 
        if(selectedCities.length === 0) {
           // console.log("2222222222222222") 
            return;
        }

        axios.post('/GetBusiness',{
            city:selectedCities,
            id:localStorage.getItem('id'),
            permission:localStorage.getItem('permission')   
        })
        .then(function (res) {
            //console.log(res, res.status ,  res.data.length);  
            if( res.status === 200 && res.data.length > 0){               
                //console.log(res.data); 
                const option = res.data.map(businessName => ({ label: businessName, value: businessName }));
                //const option = res.data.map(cityName => cityName.label);
                setBusiness(option)
            }else{                
                alert('검색된 데이터가 없습니다.');
            }
        })
        .catch(function (error) {
            alert(error.response.data.error);
        });   
    }, [selectedCities]);

    useEffect(() => {
        //console.log(selectedBusiness); 
        if(selectedBusiness.length === 0 || selectedCities.length === 0) {
            //console.log("333333333333333") 
            return;
        }
        axios.post('/GetRoutes',{  
            city:selectedCities,
            business:selectedBusiness,
            id:localStorage.getItem('id'),
            permission:localStorage.getItem('permission')   
        })
        .then(function (res) {
            //console.log(res, res.status ,  res.data.length);  
            if( res.status === 200 && res.data.length > 0){               
                //console.log(res.data); 
                const option = res.data.map(businessName => ({ label: businessName, value: businessName }));
                //const option = res.data.map(cityName => cityName.label);
                setRoutes(option)
            }else{                
                alert('검색된 데이터가 없습니다.');
            }
        })
        .catch(function (error) {
            alert(error.response.data.error);
        });   
    }, [selectedBusiness]);

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
        axios.post('/DataSubscription', {            
                city: selectedCities,
                business: selectedBusiness,
                routes: selectedRoutes,
                year:year,
                month:month,
                id:localStorage.getItem('id'),
                permission:localStorage.getItem('permission')  
        })
        .then(function (res) {
        //console.log(res, res.status ,  res.data.length);  
            if( res.status === 200 && res.data.length > 0){               
                console.log(res.data);   
                //setMessage(res.data);
                const msg = ` ${year} 년 ${month} 월 지역 : ${selectedCities.join(',')} 사업자 : ${selectedBusiness.join(',')} 노선 : ${selectedRoutes.join(',')} 의 분석데이터 요청이 완료 되었습니다. ` ;
                //setMessage(msg);
                setMessage(prevMessage=>[...prevMessage, msg]);
            }else{                
                alert('검색된 데이터가 없습니다.');
            }
        })
        .catch(function (error) {
            alert(error.response.data.error);
        });          
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