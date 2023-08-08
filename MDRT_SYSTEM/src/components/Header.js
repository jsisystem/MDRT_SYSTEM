import { useState , useEffect} from 'react';
import { Link , useLocation} from 'react-router-dom';
import $ from 'jquery';

const Header = (props) => {
    
    const location = useLocation();
    //console.log(location.pathname);

    const [menu, setMenu] = useState('');

    useEffect(() => {
        if(location.pathname === '/Update' ||location.pathname === '/Analyze' ){
            setMenu('RawData');
        }
        else if(location.pathname === '/NewProject' ||location.pathname === '/OpenProject' ||location.pathname === '/ViewProject' ||location.pathname === '/EditingRequest'){
            setMenu('Project');
        }
        else if(location.pathname === '/BusinessStatus' ||location.pathname === '/RouteStatus' ||location.pathname === '/BusStopStatus' ||location.pathname === '/UserSatisfaction'||location.pathname === '/OperationalEfficiency'||location.pathname === '/SystemStability'||location.pathname === '/CarbonNeutrality'){
            setMenu('Statistics');
        }
        else if(location.pathname === '/NewRoute' ||location.pathname === '/DispatchPlan' ){
            setMenu('RoutePlan');
        }
        else if(location.pathname === '/PotentialStop' ||location.pathname === '/StationCluster' ||location.pathname === '/StationAccessibility' ){
            setMenu('BusStopAnalysis');
        }
        else if(location.pathname === '/DangerousAreaInquiry' ||location.pathname === '/AccidentStatistics'||location.pathname === '/DangerousAreaRegistration' ){
            setMenu('SafetyManagement');
        }
        else if(location.pathname === '/NoticeBoard' ||location.pathname === '/Manual' ||location.pathname === '/CheckVersion' ){
            setMenu('Help');
        }
        else if(location.pathname === '/NoticeUpdate' ||location.pathname === '/SubscriberApproval' ||location.pathname === '/CheckErrors'||location.pathname === '/BusinessRegistration' ||location.pathname === '/CheckFinancialData' ){
            setMenu('Manager');
        }
        else if(location.pathname === '/AnalysisDataSubscription' ||location.pathname === '/DataImport' ||location.pathname === '/DataView' ){
            setMenu('Data');
        }
        else if(location.pathname === '/ViewProvidedData' ||location.pathname === '/UploadData' ){
            setMenu('ProvidedData');
        }
        else{
            return;
        }
    }, [location]);
    //console.log(props.permission);

    //const [activeTab, setActiveTab] = useState('');

    const handleClick = (e) => {
       // e.preventDefault();
       $('.header .tp .menu-d1 > ul > li').removeClass('active');
       //setActiveTab('');
    }; 

    useEffect(() => {
        $('.header .tp .menu-d1 > ul > li > a').mouseenter(function () {
          $('.header .tp .menu-d1 > ul > li').removeClass('active');
          $(this).parent().addClass('active');
        });
      }, []);
    
    const handleLogout = () => {
        sessionStorage.clear();
        document.location.href = '/';
    };

    const getMenu = () => {
        const topManagerMenu = (
            <ul>
                <li className={`RawData ${menu === 'RawData' ? 'active' : ''}`}>
                    <Link>자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`Analyze ${location.pathname === '/Analyze' ? 'active' : ''}`}>
                        <Link to="Analyze">
                        분석 및 등록자료 승인
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
 
                <li className={`Project ${menu === 'Project' ? 'active' : ''}`} >
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >프로젝트관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewProject ${location.pathname === '/NewProject' ? 'active' : ''}`}>
                            <Link to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${location.pathname === '/OpenProject' ? 'active' : ''}`}>
                            <Link to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${location.pathname === '/ViewProject' ? 'active' : ''}`}>
                            <Link to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className={`Statistics ${menu === 'Statistics' ? 'active' : ''}`}>
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${location.pathname === '/BusinessStatus' ? 'active' : ''}`}>
                            <Link to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${location.pathname === '/RouteStatus' ? 'active' : ''}`}>
                            <Link to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${location.pathname === '/BusStopStatus' ? 'active' : ''}`}>
                            <Link to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${location.pathname === '/UserSatisfaction' ? 'active' : ''}`}>
                            <Link to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${location.pathname === '/OperationalEfficiency' ? 'active' : ''}`}>
                            <Link to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${location.pathname === '/SystemStability' ? 'active' : ''}`}>
                            <Link to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${location.pathname === '/CarbonNeutrality' ? 'active' : ''}`}>
                            <Link to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className={`RoutePlan ${menu === 'RoutePlan' ? 'active' : ''}`}>
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${location.pathname === '/NewRoute' ? 'active' : ''}`}>
                        <Link to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${location.pathname === '/DispatchPlan' ? 'active' : ''}`}>
                        <Link to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className={`BusStopAnalysis ${menu === 'BusStopAnalysis' ? 'active' : ''}`} >
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${location.pathname === '/PotentialStop' ? 'active' : ''}`}>
                        <Link to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${location.pathname === '/StationCluster' ? 'active' : ''}`}>
                        <Link to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${location.pathname === '/StationAccessibility' ? 'active' : ''}`}>
                        <Link to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className={`SafetyManagement ${menu === 'SafetyManagement' ? 'active' : ''}`} >
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${location.pathname === '/DangerousAreaInquiry' ? 'active' : ''}`}>
                        <Link to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${location.pathname === '/AccidentStatistics' ? 'active' : ''}`}>
                        <Link to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className={`Help ${menu === 'Help' ? 'active' : ''}`}>
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${location.pathname === '/NoticeBoard' ? 'active' : ''}`}>
                        <Link to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${location.pathname === '/Manual' ? 'active' : ''}`}>
                        <Link to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${location.pathname === '/CheckVersion' ? 'active' : ''}`}>
                        <Link to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>      
                <li className={`Manager ${menu === 'Manager' ? 'active' : ''}`}>
                    <Link>관리자</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeUpdate ${location.pathname === '/NoticeUpdate' ? 'active' : ''}`}>
                        <Link to="NoticeUpdate">
                        공지사항 등록
                        </Link>
                        </li>
                        <li className={`SubscriberApproval ${location.pathname === '/SubscriberApproval' ? 'active' : ''}`}>
                        <Link to="SubscriberApproval">
                        가입자 확인 및 승인
                        </Link>
                        </li>   
                        <li className={`CheckErrors ${location.pathname === '/CheckErrors' ? 'active' : ''}`}>
                        <Link to="CheckErrors">
                        오류사항 확인
                        </Link>
                        </li>    
                        <li className={`BusinessRegistration ${location.pathname === '/BusinessRegistration' ? 'active' : ''}`}>
                        <Link to="BusinessRegistration">
                        사업자 등록
                        </Link>
                        </li> 
                        <li className={`CheckFinancialData ${location.pathname === '/CheckFinancialData' ? 'active' : ''}`}>
                        <Link to="CheckFinancialData">
                        재정 자료 확인
                        </Link>
                        </li>                        
                    </ul>
                    </div>
                </li>         
            </ul>
        );

        const managerMenu = (
            <ul>
                <li className={`RawData ${menu === 'RawData' ? 'active' : ''}`}>
               
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>원시자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`Update ${location.pathname === '/Update' ? 'active' : ''}`}>
                        <Link to="Update">
                            자료갱신 확인 및 검증
                        </Link>
                        </li>
                        <li className={`Analyze ${location.pathname === '/Analyze' ? 'active' : ''}`}>
                        <Link to="Analyze">
                        분석 및 등록자료 승인
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                {/* <li className={`RawData ${menu === 'RawData' ? 'active' : ''}`}>
                    <Link>자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`Analyze ${location.pathname === '/Analyze' ? 'active' : ''}`}>
                        <Link to="Analyze">
                        분석 및 등록자료 승인
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>   */}
                <li className={`Project ${menu === 'Project' ? 'active' : ''}`}>
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >프로젝트관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewProject ${location.pathname === '/NewProject' ? 'active' : ''}`}>
                            <Link to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${location.pathname === '/OpenProject' ? 'active' : ''}`}>
                            <Link to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${location.pathname === '/ViewProject' ? 'active' : ''}`}>
                            <Link to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className={`Statistics ${menu === 'Statistics' ? 'active' : ''}`}>
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${location.pathname === '/BusinessStatus' ? 'active' : ''}`}>
                            <Link to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${location.pathname === '/RouteStatus' ? 'active' : ''}`}>
                            <Link to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${location.pathname === '/BusStopStatus' ? 'active' : ''}`}>
                            <Link to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${location.pathname === '/UserSatisfaction' ? 'active' : ''}`}>
                            <Link to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${location.pathname === '/OperationalEfficiency' ? 'active' : ''}`}>
                            <Link to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${location.pathname === '/SystemStability' ? 'active' : ''}`}>
                            <Link to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${location.pathname === '/CarbonNeutrality' ? 'active' : ''}`}>
                            <Link to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className={`RoutePlan ${menu === 'RoutePlan' ? 'active' : ''}`}>
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${location.pathname === '/NewRoute' ? 'active' : ''}`}>
                        <Link to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${location.pathname === '/DispatchPlan' ? 'active' : ''}`}>
                        <Link to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className={`BusStopAnalysis ${menu === 'BusStopAnalysis' ? 'active' : ''}`}>
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${location.pathname === '/PotentialStop' ? 'active' : ''}`}>
                        <Link to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${location.pathname === '/StationCluster' ? 'active' : ''}`}>
                        <Link to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${location.pathname === '/StationAccessibility' ? 'active' : ''}`}>
                        <Link to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className={`SafetyManagement ${menu === 'SafetyManagement' ? 'active' : ''}`} >
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaRegistration ${location.pathname === 'DangerousAreaRegistration' ? 'active' : ''}`}>
                        <Link to="DangerousAreaRegistration">
                        위험 구역 등록
                        </Link>
                        </li>
                        <li className={`DangerousAreaInquiry ${location.pathname === '/DangerousAreaInquiry' ? 'active' : ''}`}>
                        <Link to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${location.pathname === '/AccidentStatistics' ? 'active' : ''}`}>
                        <Link to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className={`Help ${menu === 'Help' ? 'active' : ''}`}>
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${location.pathname === '/NoticeBoard' ? 'active' : ''}`}>
                        <Link to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${location.pathname === '/Manual' ? 'active' : ''}`}>
                        <Link to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${location.pathname === '/CheckVersion' ? 'active' : ''}`}>
                        <Link to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>      
                <li className={`Manager ${menu === 'Manager' ? 'active' : ''}`}>
                    <Link>관리자</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeUpdate ${location.pathname === '/NoticeUpdate' ? 'active' : ''}`}>
                        <Link to="NoticeUpdate">
                        공지사항 등록
                        </Link>
                        </li>
                        {/* <li className={`SubscriberApproval ${location.pathname === '/SubscriberApproval' ? 'active' : ''}`}`}>
                        <Link to="SubscriberApproval">
                        가입자 확인 및 승인
                        </Link>
                        </li>    */}
                        <li className={`CheckErrors ${location.pathname === '/CheckErrors' ? 'active' : ''}`}>
                        <Link to="CheckErrors">
                        오류사항 확인
                        </Link>
                        </li>    
                        <li className={`BusinessRegistration ${location.pathname === '/BusinessRegistration' ? 'active' : ''}`}>
                        <Link to="BusinessRegistration">
                        사업자 등록
                        </Link>
                        </li> 
                        <li className={`CheckFinancialData ${location.pathname === '/CheckFinancialData' ? 'active' : ''}`}>
                        <Link to="CheckFinancialData">
                        재정 자료 확인
                        </Link>
                        </li>                        
                    </ul>
                    </div>
                </li>         
            </ul>
        );

        const requesterMenu = (
            <ul>
                <li className={`Data ${menu === 'Data' ? 'active' : ''}`}>
                    <Link>자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`AnalysisDataSubscription ${location.pathname === '/AnalysisDataSubscription' ? 'active' : ''}`}>
                        <Link to="AnalysisDataSubscription">
                        분석자료 신청하기
                        </Link>
                        </li>
                        <li className={`DataImport ${location.pathname === '/DataImport' ? 'active' : ''}`}>
                        <Link to="DataImport">
                        자료 Import
                        </Link>
                        </li>  
                        <li className={`DataView ${location.pathname === '/DataView' ? 'active' : ''}`}>
                        <Link to="DataView">
                        신청자료 내역보기
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className="Project">
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >프로젝트관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewProject ${location.pathname === '/NewProject' ? 'active' : ''}`}>
                            <Link to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${location.pathname === '/OpenProject' ? 'active' : ''}`}>
                            <Link to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${location.pathname === '/ViewProject' ? 'active' : ''}`}>
                            <Link to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>
                        <li className={`EditingRequest ${location.pathname === '/EditingRequest' ? 'active' : ''}`}>
                            <Link to="EditingRequest">
                            분석자료 편집 및 승인 요청
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className={`Statistics ${menu === 'Statistics' ? 'active' : ''}`}>
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${location.pathname === '/BusinessStatus' ? 'active' : ''}`}>
                            <Link to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${location.pathname === '/RouteStatus' ? 'active' : ''}`}>
                            <Link to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${location.pathname === '/BusStopStatus' ? 'active' : ''}`}>
                            <Link to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${location.pathname === '/UserSatisfaction' ? 'active' : ''}`}>
                            <Link to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${location.pathname === '/OperationalEfficiency' ? 'active' : ''}`}>
                            <Link to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${location.pathname === '/SystemStability' ? 'active' : ''}`}>
                            <Link to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${location.pathname === '/CarbonNeutrality' ? 'active' : ''}`}>
                            <Link to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className={`RoutePlan ${menu === 'RoutePlan' ? 'active' : ''}`}>
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${location.pathname === '/NewRoute' ? 'active' : ''}`}>
                        <Link to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${location.pathname === '/DispatchPlan' ? 'active' : ''}`}>
                        <Link to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className={`BusStopAnalysis ${menu === 'BusStopAnalysis' ? 'active' : ''}`}>
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${location.pathname === '/PotentialStop' ? 'active' : ''}`}>
                        <Link to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${location.pathname === '/StationCluster' ? 'active' : ''}`}>
                        <Link to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${location.pathname === '/StationAccessibility' ? 'active' : ''}`}>
                        <Link to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className={`SafetyManagement ${menu === 'SafetyManagement' ? 'active' : ''}`}>
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${location.pathname === '/DangerousAreaInquiry' ? 'active' : ''}`}>
                        <Link to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${location.pathname === '/AccidentStatistics' ? 'active' : ''}`}>
                        <Link to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className={`Help ${menu === 'Help' ? 'active' : ''}`}>
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${location.pathname === '/NoticeBoard' ? 'active' : ''}`}>
                        <Link to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${location.pathname === '/Manual' ? 'active' : ''}`}>
                        <Link to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${location.pathname === '/CheckVersion' ? 'active' : ''}`}>
                        <Link to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>  
            </ul>            
        )

        const providerMenu = (
            <ul>
                <li className={`ProvidedData ${menu === 'ProvidedData' ? 'active' : ''}`}>
                    <Link>제공 자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`ViewProvidedData ${location.pathname === '/ViewProvidedData' ? 'active' : ''}`}>
                        <Link to="ViewProvidedData">
                        자료 내역보기
                        </Link>
                        </li>
                        <li className={`UploadData ${location.pathname === '/UploadData' ? 'active' : ''}`}>
                        <Link to="UploadData">
                        수동으로 자료 올리기
                        </Link>
                        </li>                         
                    </ul>
                    </div>
                </li>  
                
                <li className={`SafetyManagement ${menu === 'SafetyManagement' ? 'active' : ''}`}>
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${location.pathname === '/DangerousAreaInquiry' ? 'active' : ''}`}>
                        <Link to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${location.pathname === '/AccidentStatistics' ? 'active' : ''}`}>
                        <Link to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className={`Help ${menu === 'Help' ? 'active' : ''}`}>
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${location.pathname === '/NoticeBoard' ? 'active' : ''}`}>
                        <Link to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${location.pathname === '/Manual' ? 'active' : ''}`}>
                        <Link to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${location.pathname === '/CheckVersion' ? 'active' : ''}`}>
                        <Link to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>  
            </ul> 
        );

        if (props.permission === 'SMNG') {
            return topManagerMenu;
          } else if (props.permission === 'MNG') {
            return managerMenu;
          } else if (props.permission === 'REQU') {
            return requesterMenu;
          } else if (props.permission === 'PROV') {
            return providerMenu;
          } else {
            return (
              <>
                <Link to="/">Main</Link>
              </>
            );
          }      
        } 


    return (
        <div className="header">
            <div className="tp flx-jc-sb-ai-cn">
                <ul>
                    <li className="hd-logo" style={{ marginBottom: '13px' }}>
                        <Link onClick={handleClick} to="/Main">
                        <img src={require('../share/img/common/img-kr-logo.png')} alt="logo" />
                        </Link>
                    </li>
                    <li className="hd-logo-sub one-m-font mgl10" style={{ fontSize: '1.07em' }}>
                        M-DRT 의사결정지원시스템
                    </li>
                    <li>
                        <button className="hambuger-btn" />
                    </li>
                    <li className="menu-d1">
                        {getMenu()}
                    </li>
                </ul>
                <button className="logout" onClick={handleLogout}>
                    <span>로그아웃</span>
                </button>
            </div>
            <div className="bt" />
        </div>
    );
}

export default Header;