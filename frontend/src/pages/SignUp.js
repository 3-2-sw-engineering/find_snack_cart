import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/SignUp.css'
import { createUser } from '../shared/BackendRequests';
import { signUpTerm } from '../shared/constantLists.js'

function SignUp() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        id: "",
        pw: "",
        pwCheck: "",
        nickname: "",
        email: "",
        code: ""
    });

    const [checkData, setCheckData] = useState({
        isIdValid: false,
        isPwValid: false,
        isCodeValid: true,
        isOwner: false,
        isConsentient: false,

    })
    const [guideStr, setGuideStr] = useState({
        id: '',
        pwcheck: '',
        email: '',
        code: ''
    });


    const checkIdValid = () => {
        const id = signUpData.id;
        var ret = true;

        var guide = ''
        var num = id.search(/[0-9]/g);
        var eng = id.search(/[a-z]/ig);
        if (id.length < 2) {
            guide += "너무 짧습니다. ";
            ret = false;
        } else if (id.search(/\s/) !== -1) {
            guide += "공백이 없어야 합니다. ";
            ret = false;
        } else if (num < 0 && eng < 0) {
            guide += "영문이나 숫자를 사용해야 합니다."
            ret = false;
        }
        if (ret) {
            // id 중복 체크

        }
        setCheckData({
            ...checkData,
            isIdValid: ret
        });
        setGuideStr({
            ...guideStr,
            id: ret ? '사용할 수 있습니다.' : guide
        });
    }
    const onInputChange = (e) => {
        const { value, name } = e.target;
        if (name === 'id') {
            setCheckData({
                ...checkData,
                isIdValid: false
            });
        } else if (name === 'email') {
            // setCheckData({
            //     ...checkData,
            //     isCodeValid: false
            // });
        }
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    }
    const onPwChange = (e) => {
        const { value, name } = e.target;
        const pw = (name === 'pw') ? value : signUpData.pw;
        const pwCheck = (name === 'pwCheck') ? value : signUpData.pwCheck;
        var ret = true;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
        var guide = ''
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        if (pw.length < 6) {
            guide += "너무 짧습니다. ";
            ret = false;
        } else if (pw.search(/\s/) !== -1) {
            guide += "공백이 없어야 합니다. ";
            ret = false;
        } else if (num < 0 || eng < 0) {
            guide += "영문과 숫자를 혼합해야 합니다. "
            ret = false;
        }
        if (pw !== pwCheck) {
            ret = false;
            guide += '일치하지 않습니다.'
        }
        setCheckData({
            ...checkData,
            isPwValid: ret
        })
        setGuideStr({
            ...guideStr,
            pwcheck: ret ? '일치합니다.' : guide
        })
    }

    const sendEmail = () => {
        const email = signUpData.email;
        setGuideStr({
            ...guideStr,
            email: '위 이메일 주소로 인증번호를 보냈습니다.'
        });
    }

    const checkCode = () => {
        const code = signUpData.code;
        var ret = true;

        setCheckData({
            ...checkData,
            isCodeValid: ret
        });
        setGuideStr({
            ...guideStr,
            code: ret ? '인증번호가 일치합니다.' : '인증번호가 일치하지 않습니다.'
        });
    }

    const onCheckChange = (e) => {
        const { id, checked } = e.target;
        setCheckData({
            ...checkData,
            [id]: checked
        });
    }

    const onSignUpClick = async () => {
        if (!checkData.isIdValid) {
            alert("ID 중복확인해주세요.");
        } else if (!checkData.isPwValid) {
            alert("비밀번호를 확인해주세요.");
        } else if (signUpData.nickname.length < 1) {
            alert("닉네임을 입력해주세요.");
        } else if (signUpData.email.length < 1) {
            alert("이메일을 입력해주세요.");
        } else if (!checkData.isCodeValid) {
            alert("이메일을 인증해주세요.")
        } else if (!checkData.isConsentient) {
            alert("이용약관에 동의해주세요.");
        }
        else {
            let ret = await createUser(signUpData.id, signUpData.pw, signUpData.nickname, signUpData.email)
                .then()
                .catch(
                    e => alert("회원가입할 수 없습니다."));
            console.log(ret);
            if (ret === undefined) return;
            if (ret.result) {
                alert("회원가입 성공! 로그인해 주세요.");
                navigate('../login');
                return;
            } else {
                alert("회원가입할 수 없습니다.");
            }
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
                    <input name="pw" className="item-input" type="password" onChange={onPwChange} />
                    <div className="item-report"> 영어, 숫자 혼용 6자리 이상</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* pw 확인 */}
            <div className="sign-up-item">
                <div className="item-info">password 확인</div>
                <div className="item-input-report">
                    <input name="pwCheck" className="item-input" type="password" onChange={onPwChange} />
                    <div className="item-report"> {guideStr.pwcheck}</div>
                </div>
                <div className="item-button-none"></div>
            </div>

            {/* nickname */}
            <div className="sign-up-item">
                <div className="item-info">닉네임</div>
                <div className="item-input-report">
                    <input name="nickname" className="item-input" onChange={onInputChange} />
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
                {/* <div className="item-button" onClick={sendEmail}>보내기</div> */}
                <div className="item-button-none"></div>
            </div>

            {/* code */}
            {/* <div className="sign-up-item">
                <div className="item-info">인증번호</div>
                <div className="item-input-report">
                    <input name="code" className="item-input" onChange={onInputChange} />
                    <div className="item-report"> {guideStr.code} </div>
                </div>
                <div className="item-button" onClick={checkCode}>인증하기</div>
            </div> */}

            {/* owner check */}
            <FormGroup className="check-owner">
                <FormControlLabel control={<Checkbox id="isOwner" onChange={onCheckChange} />} label="나는 가게 사장님입니다." />
            </FormGroup>

            {/* usage regulation check */}
            <FormGroup className="check-agree">
                <FormControlLabel control={<Checkbox id="isConsentient" onChange={onCheckChange} />} label="이용약관에 동의합니다." />
            </FormGroup>

            {/* Sign up button */}
            <div className="sign-up-button" onClick={onSignUpClick}> 회원가입</div>

            {/* contents of regulation? */}
            <div className="agreement">
                {signUpTerm.split('\n').map((line) => {
                    return (<span className="term"> {line} <br /> </span>);
                })}
            </div>

        </div>
    );
}

export default SignUp;