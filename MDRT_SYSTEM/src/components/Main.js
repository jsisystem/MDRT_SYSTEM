import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AlarmModal from "./AlarmModal";
import Footer from "./Footer";

// var routo = window.routo;
// var routoMap = null;

function Main () {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
      setModalOpen(false);
      sessionStorage.setItem('new', "No")
    };

    useEffect(() => {
        const initializeMap = () => {
            const routoMap = new window.routo.maps.Map("map");
            //routoMap.setMapTypeId('Roadmap_Vector_Black');
            routoMap.setMapTypeId('Roadmap_Image_Black');
        };
                
        initializeMap();
        
        if (sessionStorage.getItem('new') === "Yes") {
          setModalOpen(true);
        }
    }, []);

    // const renderLinks = () => {
    //     const links = [];
        
    //     if (sessionStorage.getItem('permission') === "TopManager") {
    //       links.push(
    //         <>
    //         <Link to="/Update">
    //           원시자료 승인요청: {`${sessionStorage.getItem('rawData')} 건`}
    //         </Link>
    //         <br/>
    //         </>
    //       );
    //     }
        
    //     if (
    //       sessionStorage.getItem('permission') === "Manager" ||
    //       sessionStorage.getItem('permission') === "TopManager"
    //     ) {
    //       links.push(
    //         <>
    //         <Link to="/Analyze">
    //           분석자료 승인요청: {`${sessionStorage.getItem('analData')} 건`}
    //         </Link>
    //         <br/>
    //         <Link to="/Analyze">
    //           등록자료 승인요청: {`${sessionStorage.getItem('registration')} 건`}
    //         </Link>
    //         </>
    //       );
    //     }
        
    //     return links;
    // };
    
    return(
        <div className="contents-container">
            <div className="cont-box">
                <div>
                    <div className="substance">
                        <div className="map-area">
                            <div id="map" className="map">  
                            </div>                        
                        </div>
                    </div>
                    <Footer/>
                </div>            
            </div>            
            <AlarmModal open={modalOpen} close={closeModal} header={`${sessionStorage.getItem('id')} 님`}>
                신규 알림 입니다. <br/><br/>
                <Link to="/NoticeBoard/Announcement">공지사항 : {`${sessionStorage.getItem('notify')} 건`}</Link><br/>
                <Link to="/NoticeBoard/Inquiry">문의사항 : {`${sessionStorage.getItem('inquiry')} 건`}</Link><br/>
                <Link to="/NoticeBoard/ErrorReporting">오류보고 : {`${sessionStorage.getItem('error')} 건`}</Link><br/><br/>
                {sessionStorage.getItem('permission') === "MNG" ? 
                    <> <Link to="/Update">원시자료 승인요청 : {`${sessionStorage.getItem('rawData')} 건`}</Link><br/></>
                 : null
                }  
                {
                    sessionStorage.getItem('permission') === "MNG"  || sessionStorage.getItem('permission') === "SMNG" ? 
                    <> <Link to="/Analyze">분석자료 승인요청 : {`${sessionStorage.getItem('analData')} 건`}</Link> <br/> 
                       <Link to="/Analyze">등록자료 승인요청 : {`${sessionStorage.getItem('registration')} 건`}</Link><br/>
                    </> 
                    : null
                }
            </AlarmModal>
        </div>
    )
}
export default Main;