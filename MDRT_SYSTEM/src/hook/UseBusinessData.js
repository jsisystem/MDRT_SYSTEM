import { useState, useEffect } from 'react';
import axios from 'axios';

const UseBusinessData = (selectedCities) => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    if (selectedCities.length === 0) {
      return;
    }

    axios
      .post('/GetBusiness', {
        city: selectedCities,
        id: localStorage.getItem('id'),
        permission: localStorage.getItem('permission'),
      })
      .then(function (res) {
        if (res.status === 200 && res.data.length > 0) {
          const option = res.data.map((businessName) => ({ label: businessName, value: businessName }));
          setBusiness(option);
        } else {
          alert('검색된 데이터가 없습니다.');
        }
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  }, [selectedCities]);

  return business;
};

export default UseBusinessData;