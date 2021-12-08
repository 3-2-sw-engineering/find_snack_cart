// Jaesun


import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/Login.css'
import { getUserInfo, login } from '../shared/BackendRequests';
import { setUserCookie } from '../shared/cookie';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        id: '',
        pw: ''
    });



    function viewSignUp() {
        navigate('../signup')
    }

    function viewMain() {
        navigate('/')
    }

    function onChange(e) {
        const { value, name } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }
    async function handleSubmit() {

        let ret = await login(loginData.id, loginData.pw)
            .catch(e => { alert("로그인할 수 없습니다."); return; });
        if (ret === undefined) {
            return;
        }
        else if (ret.result) {
            let loginUser = await getUserInfo(loginData.id).catch(() => { alert("유저정보를 가져올 수 없습니다."); });

            setUserCookie(loginData.id, loginUser.user_name, loginUser.role);
            alert("환영합니다.");
            viewMain();
        }

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
                        <input className="login-input" name="id" type='text' onChange={(e) => onChange(e)} placeholder="ID" />
                        <input className="login-input" name="pw" type='password' onChange={(e) => onChange(e)} placeholder="password" />
                    </div>
                    <div className="login-button" onClick={() => handleSubmit()}>로그인</div>
                </div>
                <div className="find-signup-container">
                    <div className="login-find-signup" onClick={() => viewSignUp()}>
                        <u className="signup" >회원가입</u>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;