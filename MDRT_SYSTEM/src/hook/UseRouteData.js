import { useState, useEffect } from 'react';
import axios from 'axios';

const UseRouteData = (selectedBusiness, selectedCities) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (selectedBusiness.length === 0|| selectedCities.length === 0) {
      return;
    }

    axios
      .post('/GetRoutes', {
        city:selectedCities,
        business:selectedBusiness,
        id: localStorage.getItem('id'),
        permission: localStorage.getItem('permission'),
      })
      .then(function (res) {
        if (res.status === 200 && res.data.length > 0) {
          const option = res.data.map((routesName) => ({ label: routesName, value: routesName }));
          setRoutes(option);
        } else {
          alert('검색된 데이터가 없습니다.');
        }
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  }, [selectedBusiness,selectedCities]);

  return routes;
};

export default UseRouteData;