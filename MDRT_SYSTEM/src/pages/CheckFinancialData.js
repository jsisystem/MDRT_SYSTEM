import {Link, useLocation} from 'react-router-dom';
import Subsidy from './Subsidy';
import OperatingCost from './OperatingCost';
import FeeAdequacy from './FeeAdequacy';

function CheckFinancialData(){

    const location = useLocation();

    const onChangeCss = (e) =>{
        let ulTag = document.querySelector(`div[class=depth-3] ul`);
        // console.log(ulTag);
        ulTag.querySelector(`li[class=active]`).classList.toggle('active');
        
        e.target.parentElement.classList.toggle('active');
      }   

    return(
        <div className="contents-container">
            <div className="lnb active">
              <div className="depth-3">
              <ul className="active">
                  <li className="active">
                    <Link onClick={onChangeCss} to={"Subsidy"}>재정 지원금 수령 내역</Link>
                  </li>                    
                  <li >
                    <Link onClick={onChangeCss} to={"OperatingCost"}>운영비용</Link>
                  </li>
                  <li >
                    <Link onClick={onChangeCss} to={"FeeAdequacy"}>수수료 적정성</Link>
                  </li>
                </ul>         
              </div>
              {/* <div className="lnb-bx-btn"><button className="box-arrow" /></div> */}
            </div> 
            {                
                location.pathname === "/CheckFinancialData/Subsidy"? <Subsidy/> :
                location.pathname === "/CheckFinancialData/SubOperatingCostsidy"? <OperatingCost/> :
                location.pathname === "/CheckFinancialData/FeeAdequacy"? <FeeAdequacy/> : <Subsidy/>                
            }    
        </div>
    );
}

export default CheckFinancialData;