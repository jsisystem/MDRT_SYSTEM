import { useState, useEffect } from 'react';
import axios from 'axios';

const UseCityData = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .post('/GetCity', {
        id: localStorage.getItem('id'),
        permission: localStorage.getItem('permission'),
      })
      .then(function (res) {
        if (res.status === 200 && res.data.length > 0) {
          const option = res.data.map((cityName) => ({ label: cityName, value: cityName }));
          setCities(option);
        } else {
          alert('검색된 데이터가 없습니다.');
        }
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  }, []);

  return cities;
};

export default UseCityData;