import React from 'react';

const YearMonthComboBox = (props) => {

  const currentYear = new Date().getFullYear();
  const startYear = 2023;

  const handleYearChange = (event) => {
    //setYear(event.target.value);
    if(props.point === "start"){
      props.setStartYear(event.target.value);
    }else if(props.point === "end"){
      props.setEndYear(event.target.value);      
    }else{
      props.setYear(event.target.value);
    }    
  };

  const handleMonthChange = (event) => {
    //setMonth(event.target.value);
    if(props.point === "start"){
      props.setStartMonth(event.target.value);
    }else if(props.point === "end"){
      props.setEndMonth(event.target.value);      
    }else{
      props.setMonth(event.target.value);
    } 
    
  };

  //const years = ['2023']; // 년도 옵션 배열
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => (startYear + index).toString());
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // 월 옵션 배열

  return (
    <div className="flx-ai-cn" style={{gap: '25px'}}>
        <div className="flx-ai-cn">
            <label className="form-label">검색년</label>
            <select className="form-select" onChange={handleYearChange}>       
            <option value="">--년--</option>
            {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
                {yearOption}년
            </option>
            ))}
            </select>
        </div>
        <div className="flx-ai-cn">
            <label className="form-label">검색월</label>
            <select className="form-select" onChange={handleMonthChange}>
                <option value="">--월--</option>
                {months.map((monthOption) => (
                <option key={monthOption} value={monthOption}>
                    {monthOption}월
                </option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default YearMonthComboBox;