import {useState, useEffect} from 'react';
import { Routes, Route ,Outlet } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Main from './components/Main';
import NewProject from './pages/NewProject';
import Update from './pages/Update';
import Analyze from './pages/Analyze';
import OpenProject from './pages/OpenProject';
import ViewProject from './pages/ViewProject';
import BusinessStatus from './pages/BusinessStatus';
import RouteStatus from './pages/RouteStatus';
import BusStopStatus from './pages/BusStopStatus';
import UserSatisfaction from './pages/UserSatisfaction';
import OperationalEfficiency from './pages/OperationalEfficiency';
import SystemStability from './pages/SystemStability';
import CarbonNeutrality from './pages/CarbonNeutrality';
import NewRoute from './pages/NewRoute';
import DispatchPlan from './pages/DispatchPlan';
import PotentialStop from './pages/PotentialStop';
import StationCluster from './pages/StationCluster';
import StationAccessibility from './pages/StationAccessibility';
import DangerousAreaInquiry from './pages/DangerousAreaInquiry';
import AccidentStatistics from './pages/AccidentStatistics';
import NoticeBoard from './pages/NoticeBoard';
import Manual from './pages/Manual';
import CheckVersion from './pages/CheckVersion';
import Announcement from './pages/Announcement';
import Inquiry from './pages/Inquiry';
import ErrorReporting from './pages/ErrorReporting';
import NoticeUpdate from './pages/NoticeUpdate';
import SubscriberApproval from './pages/SubscriberApproval';
import CheckErrors from './pages/CheckErrors';
import BusinessRegistration from './pages/BusinessRegistration';
import CheckFinancialData from './pages/CheckFinancialData';
import Subsidy from './pages/Subsidy';
import OperatingCost from './pages/OperatingCost';
import FeeAdequacy from './pages/FeeAdequacy';
import DangerousAreaRegistration from './pages/DangerousAreaRegistration';
import AnalysisDataSubscription from './pages/AnalysisDataSubscription';
import DataImport from './pages/DataImport';
import DataView from './pages/DataView';
import EditingRequest from './pages/EditingRequest';
import ViewProvidedData from './pages/ViewProvidedData';
import UploadData from './pages/UploadData';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permission, setPermission] = useState('');
  //const [loginId, setLoginId] = useState('');

  useEffect(() => {
    setIsLoggedIn( localStorage.getItem('Login'));
    setPermission( localStorage.getItem('permission'));
    //setLoginId( localStorage.getItem('id'));
  },[]) 

  return (
    <div id="wrap">
      {
        !isLoggedIn ? 
        <Login setIsLoggedIn={setIsLoggedIn} setPermission={setPermission}/>
        : (
            <div id="wrap">
              <Header permission={permission}/>
              <Outlet />
              <Routes>  
                <Route path="/" element={<Main />}/>
                <Route path="/Main" element={<Main/>}/>
                <Route path="Update" element={<Update/>}/>
                <Route path="Analyze" element={<Analyze/>}/>
                <Route path="NewProject" element={<NewProject/>}/>
                <Route path="OpenProject" element={<OpenProject/>}/>
                <Route path="ViewProject" element={<ViewProject/>}/>
                <Route path="BusinessStatus" element={<BusinessStatus/>}/>
                <Route path="RouteStatus" element={<RouteStatus/>}/>
                <Route path="BusStopStatus" element={<BusStopStatus/>}/>
                <Route path="UserSatisfaction" element={<UserSatisfaction/>}/>
                <Route path="OperationalEfficiency" element={<OperationalEfficiency/>}/>
                <Route path="SystemStability" element={<SystemStability/>}/>
                <Route path="CarbonNeutrality" element={<CarbonNeutrality/>}/>
                <Route path="NewRoute" element={<NewRoute/>}/>
                <Route path="DispatchPlan" element={<DispatchPlan/>}/>
                <Route path="PotentialStop" element={<PotentialStop/>}/>
                <Route path="StationCluster" element={<StationCluster/>}/>
                <Route path="StationAccessibility" element={<StationAccessibility/>}/>
                <Route path="DangerousAreaRegistration" element={<DangerousAreaRegistration/>}/>
                <Route path="DangerousAreaInquiry" element={<DangerousAreaInquiry/>}/>
                <Route path="AccidentStatistics" element={<AccidentStatistics/>}/>
                <Route path="NoticeBoard" element={<NoticeBoard/>}>
                  <Route path="Announcement" element={<Announcement/>}/>
                  <Route path="Inquiry" element={<Inquiry/>}/>
                  <Route path="ErrorReporting" element={<ErrorReporting/>}/>
                </Route>
                <Route path="Manual" element={<Manual/>}/>
                <Route path="CheckVersion" element={<CheckVersion/>}/>
                <Route path="NoticeUpdate" element={<NoticeUpdate/>}/>
                <Route path="SubscriberApproval" element={<SubscriberApproval/>}/>
                <Route path="CheckErrors" element={<CheckErrors/>}/>
                <Route path="BusinessRegistration" element={<BusinessRegistration/>}/>
                <Route path="CheckFinancialData" element={<CheckFinancialData/>}>
                  <Route path="Subsidy" element={<Subsidy/>}/>
                  <Route path="OperatingCost" element={<OperatingCost/>}/>
                  <Route path="FeeAdequacy" element={<FeeAdequacy/>}/>
                </Route>
                <Route path="AnalysisDataSubscription" element={<AnalysisDataSubscription/>}/>
                <Route path="DataImport" element={<DataImport/>}/>
                <Route path="DataView" element={<DataView/>}/>
                <Route path="EditingRequest" element={<EditingRequest/>}/>
                <Route path="ViewProvidedData" element={<ViewProvidedData/>}/>
                <Route path="UploadData" element={<UploadData/>}/>
              </Routes>
            </div>
          )
      }     
    </div>
  );
}

export default App;
