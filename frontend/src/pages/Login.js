// Jaesun


import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    const navigate = useNavigate();

    function viewBack() {
        navigate('../');
    }
    function viewSignUp() {
        navigate('../signup')
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
                        <input className="login-input" type='text' />
                        <input className="login-input" type='password' />
                    </div>
                    <div className="login-button">로그인</div>
                </div>
                <div className="find-signup-container">
                    <div className="login-find-signup">
                        <u className="find">id/pw찾기</u>
                        <u className="signup" onClick={viewSignUp}>회원가입</u>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;