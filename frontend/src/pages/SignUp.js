// Jaesun


import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'

function SignUp() {
    const navigate = useNavigate();

    function viewBack() {
        navigate('../');
    }
    return (
        <div className="sign-layout">
            <div className="sign-title">회원가입</div>

            {/* id */}
            <div className="sign-up-item">
                <div className="item-info">id</div>
                <div className="item-input-report">
                    <input className="item-input" />
                    <div className="item-report"> 사용 가능한 id입니다.</div>
                </div>
                <div className="item-button">중복확인</div>
            </div>
            {/* pw */}
            <div className="sign-up-item">
                <div className="item-info">password</div>
                <div className="item-input-report">
                    <input className="item-input" type="password" />
                    <div className="item-report"> 영어, 숫자 혼용 6자리 이상</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* pw 확인 */}
            <div className="sign-up-item">
                <div className="item-info">password 확인</div>
                <div className="item-input-report">
                    <input className="item-input" type="password" />
                    <div className="item-report"> 비밀번호가 일치하지 않습니다.</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/*  */}
            <div className="sign-up-item">
                <div className="item-info">닉네임</div>
                <div className="item-input-report">
                    <input className="item-input" />
                    <div className="item-report"></div>
                </div>
                <div className="item-button-none"></div>
            </div>

            <div className="sign-up-item">
                <div className="item-info">email</div>
                <div className="item-input-report">
                    <input className="item-input" />
                    <div className="item-report">위 이메일 주소로 인증번호를 보냈습니다. </div>
                </div>
                <div className="item-button">보내기</div>
            </div>

            <div className="sign-up-item">
                <div className="item-info">인증번호</div>
                <div className="item-input-report">
                    <input className="item-input" />
                    <div className="item-report"> </div>
                </div>
                <div className="item-button">완료</div>
            </div>
            <FormGroup className="check-owner">
                <FormControlLabel control={<Checkbox defaultChecked />} label="나는 가게 사장님입니다." />
            </FormGroup>
            <FormGroup className="check-agree">
                <FormControlLabel control={<Checkbox defaultChecked />} label="이용약관에 동의합니다." />
            </FormGroup>

            <div className="sign-up-button"> 회원가입</div>

            <div className="agreement">
                갑과 을은 어쩌고저쩌고 <br />
                end<br />
            </div>

        </div>
    );
}

export default SignUp;