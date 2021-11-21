// Jaesun


import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import '../styles/Login.css'

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData]=useState({
        id:'',
        pw:''
    });
 
    function viewSignUp() {
        navigate('../signup')
    } 
    function onChange (e){
        const {value, name}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        });
    }
    function handleSubmit(){

        console.log(loginData);
    }
    return (
        <div className="login-layout" >
            <div className="login-title">
                로그인
            </div>
            <div className="blank" />
            <div className="login-container">
                <div className="login-input-button">
                    <div className="input-container">
                        <input className="login-input" name="id" type='text' onChange={(e)=>onChange(e)} placeholder="ID"/>
                        <input className="login-input" name="pw" type='password' onChange={(e)=>onChange(e)} placeholder="password"/>
                    </div>
                    <div className="login-button" onClick={()=>handleSubmit()}>로그인</div>
                </div>
                <div className="find-signup-container">
                    <div className="login-find-signup">
                        {/* <u className="find">id/pw찾기</u> */}
                        <u className="signup" onClick={()=>viewSignUp}>회원가입</u>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;