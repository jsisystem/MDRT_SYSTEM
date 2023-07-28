import { useState , useEffect} from 'react';
import { Link , useLocation} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const Header = (props) => {
    
    const location = useLocation();
    console.log(location.pathname);

    //console.log(props.permission);

    const [activeTab, setActiveTab] = useState('');

    const handleClick = (e) => {
       // e.preventDefault();
       $('.header .tp .menu-d1 > ul > li').removeClass('active');
       setActiveTab('');
    }; 

    useEffect(() => {
        $('.header .tp .menu-d1 > ul > li > a').mouseenter(function () {
          $('.header .tp .menu-d1 > ul > li').removeClass('active');
          $(this).parent().addClass('active');
        });
      }, []);
    
    const handleLogout = () => {
        localStorage.clear();
        document.location.href = '/';
    };

    const handleTabChange = (e) => {
        const text = e.target.innerText;
        const tabs = [
          '자료갱신 확인 및 검증',
          '분석 및 등록자료 승인',
          '프로젝트 새로만들기',
          '프로젝트 불러오기',
          '프로젝트 내역보기',
          '분석자료 편집 및 승인 요청',
          '사업자 현황',
          '노선 현황',
          '정류장 현황',
          '이용자 만족도',
          '운영 효율성',
          '시스템 안정성',
          '탄소 중립 지수',
          '신규 노선 분석',
          '적정 배차 계획',
          '잠재 정류장 분석',
          '정류장 군집 분석',
          '정류장 접근성 분석',
          '위험 구역 등록',
          '위험 구역 조회',
          '사고 통계',
          '게시판',
          '메뉴얼',
          '버전확인',
          '공지사항 등록',
          '가입자 확인 및 승인',
          '오류사항 확인',
          '사업자 등록',
          '재정 자료 확인',
          '분석자료 신청하기',
          '자료 Import',
          '신청자료 내역보기',
          '분석자료 편집 및 승인 요청',
          '자료 내역보기',
          '수동으로 자료 올리기',
        ];
    
        setActiveTab(text);
        tabs.forEach((tab) => {
          if (tab !== text) {
            setActiveTab((prevState) => prevState.replace(`active ${tab}`, ''));
          }
        });
    }; 

    const getMenu = () => {
        const topManagerMenu = (
            <ul>
                <li className="RawData">
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>원시자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`Update ${activeTab === '자료갱신 확인 및 검증' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Update">
                            자료갱신 확인 및 검증
                        </Link>
                        </li>
                        <li className={`Analyze ${activeTab === '분석 및 등록자료 승인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Analyze">
                        분석 및 등록자료 승인
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
                        <li className={`NewProject ${activeTab === '프로젝트 새로만들기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${activeTab === '프로젝트 불러오기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${activeTab === '프로젝트 내역보기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className="Statistics">
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${activeTab === '사업자 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${activeTab === '노선 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${activeTab === '정류장 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${activeTab === '이용자 만족도' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${activeTab === '운영 효율성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${activeTab === '시스템 안정성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${activeTab === '탄소 중립 지수' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className="RoutePlan">
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${activeTab === '신규 노선 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${activeTab === '적정 배차 계획' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className="BusStopAnalysis">
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${activeTab === '잠재 정류장 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${activeTab === '정류장 군집 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${activeTab === '정류장 접근성 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className="SafetyManagement">
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${activeTab === '위험 구역 조회' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${activeTab === '사고 통계' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className="Help">
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${activeTab === '게시판' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${activeTab === '메뉴얼' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${activeTab === '버전 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>      
                <li className="Manager">
                    <Link>관리자</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeUpdate ${activeTab === '공지사항 등록' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeUpdate">
                        공지사항 등록
                        </Link>
                        </li>
                        <li className={`SubscriberApproval ${activeTab === '가입자 확인 및 승인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="SubscriberApproval">
                        가입자 확인 및 승인
                        </Link>
                        </li>   
                        <li className={`CheckErrors ${activeTab === '오류사항 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckErrors">
                        오류사항 확인
                        </Link>
                        </li>    
                        <li className={`BusinessRegistration ${activeTab === '사업자 등록' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="BusinessRegistration">
                        사업자 등록
                        </Link>
                        </li> 
                        <li className={`CheckFinancialData ${activeTab === '재정 자료 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckFinancialData">
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
                <li className="RawData">
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>원시자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`Analyze ${activeTab === '분석 및 등록자료 승인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Analyze">
                        분석 및 등록자료 승인
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
                        <li className={`NewProject ${activeTab === '프로젝트 새로만들기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${activeTab === '프로젝트 불러오기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${activeTab === '프로젝트 내역보기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className="Statistics">
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${activeTab === '사업자 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${activeTab === '노선 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${activeTab === '정류장 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${activeTab === '이용자 만족도' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${activeTab === '운영 효율성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${activeTab === '시스템 안정성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${activeTab === '탄소 중립 지수' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className="RoutePlan">
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${activeTab === '신규 노선 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${activeTab === '적정 배차 계획' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className="BusStopAnalysis">
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${activeTab === '잠재 정류장 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${activeTab === '정류장 군집 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${activeTab === '정류장 접근성 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className="SafetyManagement">
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaRegistration ${activeTab === '위험 구역 등록' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DangerousAreaRegistration">
                        위험 구역 등록
                        </Link>
                        </li>
                        <li className={`DangerousAreaInquiry ${activeTab === '위험 구역 조회' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${activeTab === '사고 통계' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className="Help">
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${activeTab === '게시판' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${activeTab === '메뉴얼' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${activeTab === '버전 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>      
                <li className="Manager">
                    <Link>관리자</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeUpdate ${activeTab === '공지사항 등록' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeUpdate">
                        공지사항 등록
                        </Link>
                        </li>
                        <li className={`SubscriberApproval ${activeTab === '가입자 확인 및 승인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="SubscriberApproval">
                        가입자 확인 및 승인
                        </Link>
                        </li>   
                        <li className={`CheckErrors ${activeTab === '오류사항 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckErrors">
                        오류사항 확인
                        </Link>
                        </li>    
                        <li className={`BusinessRegistration ${activeTab === '사업자 등록' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="BusinessRegistration">
                        사업자 등록
                        </Link>
                        </li> 
                        <li className={`CheckFinancialData ${activeTab === '재정 자료 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckFinancialData">
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
                <li className="Data">
                    <Link>자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`AnalysisDataSubscription ${activeTab === '분석자료 신청하기' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="AnalysisDataSubscription">
                        분석자료 신청하기
                        </Link>
                        </li>
                        <li className={`DataImport ${activeTab === '자료 Import' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DataImport">
                        자료 Import
                        </Link>
                        </li>  
                        <li className={`DataView ${activeTab === '신청자료 내역보기' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DataView">
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
                        <li className={`NewProject ${activeTab === '프로젝트 새로만들기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="NewProject">
                            프로젝트 새로만들기
                            </Link>
                        </li>
                        <li className={`OpenProject ${activeTab === '프로젝트 불러오기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OpenProject">
                            프로젝트 불러오기
                            </Link>
                        </li>
                        <li className={`ViewProject ${activeTab === '프로젝트 내역보기' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="ViewProject">
                            프로젝트 내역보기
                            </Link>
                        </li>
                        <li className={`EditingRequest ${activeTab === '분석자료 편집 및 승인 요청' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="EditingRequest">
                            분석자료 편집 및 승인 요청
                            </Link>
                        </li>  
                    </ul>
                    </div>
                </li>
                <li className="Statistics">
                    {/* <Link onClick={handleClick}>프로젝트관리</Link> */}
                    <Link >기초통계지표</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`BusinessStatus ${activeTab === '사업자 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusinessStatus">
                            사업자 현황
                            </Link>
                        </li>
                        <li className={`RouteStatus ${activeTab === '노선 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="RouteStatus">
                            노선현황
                            </Link>
                        </li>
                        <li className={`BusStopStatus ${activeTab === '정류장 현황' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="BusStopStatus">
                            정류장 현황
                            </Link>
                        </li>  
                        <li className={`UserSatisfaction ${activeTab === '이용자 만족도' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="UserSatisfaction">
                            이용자 만족도
                            </Link>
                        </li> 
                        <li className={`OperationalEfficiency ${activeTab === '운영 효율성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="OperationalEfficiency">
                            운영 효율성
                            </Link>
                        </li> 
                        <li className={`SystemStability ${activeTab === '시스템 안정성' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="SystemStability">
                            시스템 안정성
                            </Link>
                        </li> 
                        <li className={`CarbonNeutrality  ${activeTab === '탄소 중립 지수' ? 'active' : ''}`}>
                            <Link onClick={handleTabChange} to="CarbonNeutrality">
                            탄소 중립 지수
                            </Link>
                        </li> 
                    </ul>
                    </div>
                </li> 
                <li className="RoutePlan">
                    {/* <Link to="/RawData">원시자료관리</Link> */}
                    {/* <Link onClick={handleClick}>원시자료관리</Link> */}
                    <Link>노선계획</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NewRoute ${activeTab === '신규 노선 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NewRoute">
                        신규 노선 분석
                        </Link>
                        </li>
                        <li className={`DispatchPlan ${activeTab === '적정 배차 계획' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DispatchPlan">
                        적정 배차 계획
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li> 
                <li className="BusStopAnalysis">
                    <Link>정류장 분석</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`PotentialStop ${activeTab === '잠재 정류장 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="PotentialStop">
                        잠재 정류장 분석
                        </Link>
                        </li>
                        <li className={`StationCluster ${activeTab === '정류장 군집 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationCluster">
                        정류장 군집 분석
                        </Link>
                        </li>  
                        <li className={`StationAccessibility ${activeTab === '정류장 접근성 분석' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="StationAccessibility">
                        정류장 접근성 분석
                        </Link>
                        </li>  
                    </ul>
                    </div>
                </li>  
                <li className="SafetyManagement">
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${activeTab === '위험 구역 조회' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${activeTab === '사고 통계' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className="Help">
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${activeTab === '게시판' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${activeTab === '메뉴얼' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${activeTab === '버전 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckVersion">
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
                <li className="ProvidedData">
                    <Link>제공 자료관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`ViewProvidedData ${activeTab === '자료 내역보기' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="ViewProvidedData">
                        자료 내역보기
                        </Link>
                        </li>
                        <li className={`UploadData ${activeTab === '수동으로 자료 올리기' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="UploadData">
                        수동으로 자료 올리기
                        </Link>
                        </li>                         
                    </ul>
                    </div>
                </li>  
                
                <li className="SafetyManagement">
                    <Link>안전관리</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`DangerousAreaInquiry ${activeTab === '위험 구역 조회' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="DangerousAreaInquiry">
                        위험 구역 조회
                        </Link>
                        </li>
                        <li className={`AccidentStatistics ${activeTab === '사고 통계' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="AccidentStatistics">
                        사고 통계
                        </Link>
                        </li>                            
                    </ul>
                    </div>
                </li>        
                <li className="Help">
                    <Link>도움말</Link>
                    <div className="menu-d2">
                    <ul>
                        <li className={`NoticeBoard ${activeTab === '게시판' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="NoticeBoard">
                        게시판
                        </Link>
                        </li>
                        <li className={`Manual ${activeTab === '메뉴얼' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="Manual">
                        메뉴얼
                        </Link>
                        </li>   
                        <li className={`CheckVersion ${activeTab === '버전 확인' ? 'active' : ''}`}>
                        <Link onClick={handleTabChange} to="CheckVersion">
                        버전 확인
                        </Link>
                        </li>                          
                    </ul>
                    </div>
                </li>  
            </ul> 
        );

        if (props.permission === 'TopManager') {
            return topManagerMenu;
          } else if (props.permission === 'Manager') {
            return managerMenu;
          } else if (props.permission === 'Requester') {
            return requesterMenu;
          } else if (props.permission === 'Provider') {
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