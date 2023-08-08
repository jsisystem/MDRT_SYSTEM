import {useState, useRef, useEffect} from "react";
import axios from 'axios';

const Login = (props) => {

    const idInputRef = useRef(null);

    const [loginId, setLoginId] = useState('');
    const [loginPwd, setLoginPwd] = useState('');

    useEffect(() => {
        // id 입력란에 포커스를 설정합니다.
        idInputRef.current.focus();
      }, []);

      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 여기에서 입력값을 처리하거나 원하는 동작을 수행합니다.
          handleLoginSubmit();
        }
      };

    const handleLoginSubmit = () => {
        let isLogin = false;
        axios.post('/login', 
            {
                id: loginId,
                pwd: loginPwd
            },
          )
          .then(function (res) {
            //console.log(res, res.status ,  res.data.length);  

            //if( res.data.length === 1 ){
            if( res.status === 200  && res.data.length === 1 ){
                isLogin = true;
                props.setIsLoggedIn(isLogin);
                //console.log(res,  res.data[0]);
                props.setPermission(res.data[0].grade);
                sessionStorage.clear()
                sessionStorage.setItem('Login', isLogin)
                sessionStorage.setItem('permission', res.data[0].grade)
                sessionStorage.setItem('id', res.data[0].id)
                sessionStorage.setItem('city', res.data[0].city)
                sessionStorage.setItem('company', res.data[0].company)
                sessionStorage.setItem('new', res.data[0].new)
                sessionStorage.setItem('notify', res.data[0].notify)
                sessionStorage.setItem('inquiry', res.data[0].inquiry)
                sessionStorage.setItem('error', res.data[0].error)
                sessionStorage.setItem('rawData', res.data[0].rawData)
                sessionStorage.setItem('analData', res.data[0].analData)
                sessionStorage.setItem('registration', res.data[0].registration)
            }else{
                isLogin= false;
                props.setIsLoggedIn(isLogin);
                alert('로그인 정보가 일치 하지 않습니다.');
                //document.location.href = '/';
            }
          })
          .catch(function (error) {
            console.log(error);
            isLogin = false;
            alert(error.response.data.error);
            props.setIsLoggedIn(isLogin);
            //document.location.href = '/';
          });   
       
    };
    
    return (
        <div id="wrap" className="login-bg">
            <div className="login-wrap">
                <img src={require("../share/img/common/img-kr-logo.png")} alt="logo" />
                <div className="flx-jc-sb-ai-cn">
                    <div className="log-lf-img">
                        <img src={require("../share/img/contents/img-login-train.png" )} alt="login" />
                    </div>
                    <ul className="log-int-container">
                        <li className="one-m-font mgb30" style={{fontSize: '1.73em', textAlign: 'center'}}>
                            M-DRT 의사결정지원시스템
                        </li>
                        <li>
                            <input className="form-control int-round mgb10" type="text" ref={idInputRef} placeholder="아이디를 입력해주세요." onChange={(event) => setLoginId(event.target.value)}/>
                        </li>
                        <li>
                            <input 
                                type="password" 
                                className="form-control int-round mgb10" 
                                placeholder="비밀번호를 입력해주세요." 
                                onChange={(event) => setLoginPwd(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </li>
                        {/* <li className="mgb20">
                            <input className="form-check-input" type="checkbox" defaultValue id="chk01" />
                            <label className="form-check-label" htmlFor="chk01">
                            아이디 저장
                            </label>
                        </li> */}
                        <li className="mgb20">
                            <button type="button" className="btn btn-primary log-gra" onClick = {handleLoginSubmit} >로그인</button>
                        </li>
                        <li className="mgb20">
                            <button type="button" className="btn btn-primary log-gra" onClick = {handleLoginSubmit} >가입하기</button>
                        </li>
                        <li className="copyright">Copyright © LX 2023. All Rights Reserved.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login;