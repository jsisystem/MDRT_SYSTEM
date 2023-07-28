import { useEffect, useState } from "react";
import axios from 'axios';
import YearMonthComboBox from "../components/YearMonthCombo";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import Footer from "../components/Footer";

// Custom hook for fetching data from API
function useDataFetching(url, params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, params);
        setData(response.data.map(item => ({ label: item, value: item })));
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params]);

  return { data, loading, error };
}

function AnalysisDataSubscription() {
  // State for selected values
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  // Custom hooks for fetching data
  const { data: cities, loading: citiesLoading, error: citiesError } = useDataFetching("/GetCity", {
    id: localStorage.getItem('id'),
    permission: localStorage.getItem('permission'),
  });
  const { data: business, loading: businessLoading, error: businessError } = useDataFetching("/GetBusiness", {
    city: selectedCities,
    id: localStorage.getItem('id'),
    permission: localStorage.getItem('permission'),
  });
  const { data: routes, loading: routesLoading, error: routesError } = useDataFetching("/GetRoutes", {
    city: selectedCities,
    business: selectedBusiness,
    id: localStorage.getItem('id'),
    permission: localStorage.getItem('permission'),
  });

  // Handle form submission
  const onRequest = () => {
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
    })
    .then(function (res) {
    //console.log(res, res.status ,  res.data.length);  
      if( res.status === 200 && res.data.length > 0){               
          console.log(res.data);   
      }else{                
          alert('검색된 데이터가 없습니다.');
      }
    })
    .catch(function (error) {
      alert(error.response.data.error);
    });
  };

  return (
    <div className="contents-container">
      <div className="cont-box">
        <div>
          <div className="substance">
            <div className="sbs-inner">
              <div className="int-gr flx-jc-sb-ai-cn mgb30">
                <div className="flx-ai-cn" style={{ gap: '25px' }}>
                  <div className="flx-ai-cn">
                    <label className="form-label">지역</label>
                    <MultiSelectDropdown
                      options={cities}
                      value={selectedCities}
                      onChange={setSelectedCities}
                      loading={citiesLoading}
                      error={citiesError}
                      labelledBy="Select"
                      hasSelectAll={true}
                    />
                  </div>
                  <div className="flx-ai-cn">
                    <label className="form-label">사업자</label>
                    <MultiSelectDropdown
                      options={business}
                      value={selectedBusiness}
                      onChange={setSelectedBusiness}
                      loading={businessLoading}
                      error={businessError}
                      labelledBy="Select"
                      hasSelectAll={true}
                    />
                  </div>
                  <div className="flx-ai-cn">
                    <label className="form-label">노선</label>
                    <MultiSelectDropdown
                      options={routes}
                      value={selectedRoutes}
                      onChange={setSelectedRoutes}
                      loading={routesLoading}
                      error={routesError}
                      labelledBy="Select"
                      hasSelectAll={true}
                    />
                  </div>
                  <div className="flx-ai-cn">
                    <YearMonthComboBox setYear={setYear} setMonth={setMonth} />
                  </div>
                </div>
                <button type="button" className="btn btn-primary sch-btn" onClick={onRequest}>요청</button>
              </div>
              <ul className="txt-list flx-ai-cn mgb10">
                {console.log(selectedCities,selectedBusiness,selectedRoutes)}
                <li>지역<b>{selectedCities.join(',')}</b></li>
                <li>사업자<b>{selectedBusiness.join(',')}</b></li>
                <li>노선<b>{selectedRoutes.join(',')}</b></li>
                <li>검색 년/월<b>{year} 년 {month} 월</b></li>
              </ul>
              <ul className="txt-list flx-ai-cn mgb10"></ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AnalysisDataSubscription;