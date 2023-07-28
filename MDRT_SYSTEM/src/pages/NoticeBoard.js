import {Link, useLocation} from 'react-router-dom';
import Announcement from './Announcement';
import Inquiry from './Inquiry';
import ErrorReporting from './ErrorReporting';
// import { useEffect, useState } from 'react';
// import $ from 'jquery';

function NoticeBoard(){

    const location = useLocation();
    // const [subMenu, setSubMenu] = useState('');
    // setSubMenu(location.pathname);

    // useEffect(() => {
    //   const pathname = location.pathname;
    //   const isActive = pathname === '/NoticeBoard/Announcement';

    //   const liElement = document.createElement('li');
    //   console.log(liElement.className);
    //   liElement.className = isActive ? 'active' : '';

    // }, [location.pathname]);

    const onChangeCss = (e) =>{
        let ulTag = document.querySelector(`div[class=depth-3] ul`);
        // console.log(ulTag);
        ulTag.querySelector(`li[class=active]`).classList.toggle('active');
        //console.log(e.target.parentElement);
        e.target.parentElement.classList.toggle('active');
     }   

    return(
        <div className="contents-container">
            <div className="lnb active">
              <div className="depth-3">
              <ul className="active">
              {/* <li className={`RawData ${menu === 'RawData' ? 'active' : ''}`}> */}
                  <li className="active"> 
                    <Link onClick={onChangeCss} to={"Announcement"}>공지사항</Link>
                  </li>                    
                  <li >
                    <Link onClick={onChangeCss} to={"Inquiry"}>문의사항</Link>
                  </li>
                  <li >
                    <Link onClick={onChangeCss} to={"ErrorReporting"}>오류보고</Link>
                  </li>
                </ul>         
              </div>
              {/* <div className="lnb-bx-btn"><button className="box-arrow" /></div> */}
            </div> 
            {                
                location.pathname === "/NoticeBoard/Announcement"? <Announcement/> :
                location.pathname === "/NoticeBoard/Inquiry"? <Inquiry/> :
                location.pathname === "/NoticeBoard/ErrorReporting"? <ErrorReporting/> : <Announcement/>                
            }    
        </div>
    );
}

export default NoticeBoard;