// Jaesun


import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, {StrictMode, useState} from 'react';
import '../styles/SignUp.css'

function SignUp() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        id:"",
        pw:"",
        pwCheck:"",
        nickname:"",
        email:"",
        code:""
    });

    const [checkData, setCheckData]=useState({
        isIdValid:false,
        isCodeValid:false,
        isOwner:false,
        isConsentient:false,

    }) 
    const [guideStr, setGuideStr] = useState({
        id: '',
        pwcheck: '',
        email:'',
        code:''
    });
 

    function viewBack() {
        navigate('../');
    }

    const checkIdValid=()=>{
        const id = signUpData.id;
        var checkResult=false;

        setCheckData({
            ...checkData,
            isIdValid:checkResult
        }); 
        setGuideStr({
            ...guideStr,
            id: checkResult? '사용할 수 있는 ID입니다.':'사용할 수 없는 ID입니다.'
        });
    }
    const onInputChange= (e) =>{        
        const {value, name} = e.target;
        setSignUpData({
            ...signUpData,
            [name]:value
        });
    }
    const onPwChange = (e)=>{
        const {value, name} = e.target;
        const pw = signUpData.pw;
        const pwCheck = signUpData.pwCheck;
        var ret=false;
        setSignUpData({
            ...signUpData,
            [name]:value
        });
        if((name === 'pw' && value === pwCheck)||(name === 'pwCheck'&& value ===pw)){
            ret=true;
        }else{
            ret=false;
        }
        setCheckData({
            ...checkData,
            isPwValid:ret
        })
        setGuideStr({
            ...guideStr,
            pwcheck: ret?'일치합니다.':'일치하지 않습니다.'
        })
    }

    const sendEmail = ()=>{
        const email = signUpData.email;
        setGuideStr({
            ...guideStr,
            email:'위 이메일 주소로 인증번호를 보냈습니다.'
        });
    }

    const checkCode = ()=>{
        const code=signUpData.code;
        var ret=false;

        setCheckData({
            ...checkData,
            isCodeValid:ret
        });
        setGuideStr({
            ...guideStr,
            code:ret? '인증번호가 일치합니다.':'인증번호가 일치하지 않습니다.'
        });
    }

    const onCheckChange=(e)=>{
        const {id, checked} = e.target;
        setCheckData({
            ...checkData,
            [id]:checked
        }); 
    }

    const signUpClick = ()=>{
        if(checkData.isIdValid && checkData.isCodeValid && checkData.isConsentient){
            //
        }
    }
    return (
        <div className="sign-layout">
            <div className="sign-title">회원가입</div>

            {/* id */}
            <div className="sign-up-item">
                <div className="item-info">id</div>
                <div className="item-input-report">
                    <input name="id" className="item-input" onChange={onInputChange} />
                    <div className="item-report">{guideStr.id}</div>
                </div>
                <div className="item-button" onClick={checkIdValid}>중복확인</div>
            </div>
            
            {/* pw */}
            <div className="sign-up-item">
                <div className="item-info">password</div>
                <div className="item-input-report">
                    <input name="pw" className="item-input" type="password" onChange = {onPwChange}/>
                    <div className="item-report"> 영어, 숫자 혼용 6자리 이상</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* pw 확인 */}
            <div className="sign-up-item">
                <div className="item-info">password 확인</div>
                <div className="item-input-report">
                    <input name="pwCheck" className="item-input" type="password" onChange = {onPwChange}/>
                    <div  className="item-report"> {guideStr.pwcheck}</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* nickname */}
            <div className="sign-up-item">
                <div className="item-info">닉네임</div>
                <div className="item-input-report">
                    <input name="nickname" className="item-input"onChange={onInputChange}  />
                    <div className="item-report"></div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* email */}
            <div className="sign-up-item">
                <div className="item-info">email</div>
                <div className="item-input-report">
                    <input name="email" className="item-input" onChange={onInputChange} />
                    <div className="item-report"> {guideStr.email}</div>
                </div>
                <div className="item-button" onClick={sendEmail}>보내기</div>
            </div>

            {/* code */}
            <div className="sign-up-item">
                <div className="item-info">인증번호</div>
                <div className="item-input-report">
                    <input name = "code" className="item-input" onChange={onInputChange} />
                    <div className="item-report"> {guideStr.code} </div>
                </div>
                <div className="item-button" onClick={checkCode}>인증하기</div>
            </div>

            {/* owner check */}
            <FormGroup className="check-owner">
                <FormControlLabel control={<Checkbox id="isOwner" onChange={onCheckChange} />} label="나는 가게 사장님입니다." />
            </FormGroup>

            {/* usage regulation check */}
            <FormGroup className="check-agree">
                <FormControlLabel  control={<Checkbox id="isConsentient" onChange={onCheckChange}/>} label="이용약관에 동의합니다." />
            </FormGroup>

            {/* Sign up button */}
            <div className="sign-up-button"> 회원가입</div>

            {/* contents of regulation? */}
            <div className="agreement">
                갑과 을은 어쩌고저쩌고 <br />
                end<br />
            </div>

        </div>
    );
}

export default SignUp;