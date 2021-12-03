// Jaesun


import { useNavigate } from 'react-router-dom';
import { Map } from "react-kakao-maps-sdk";
import { FormGroup, Checkbox, FormControlLabel, Chip } from '@mui/material';
import '../styles/Report.css'

function Report() {
    const navigate = useNavigate();

    function viewBack() {
        navigate('../');
    }

    const Chips = ({text_list, color, deleteFunction}) =>{
        return(
            text_list.map((text)=>
            <div className="chip">
                <Chip label={text} color={color} onDelete={()=>deleteFunction} />       
            </div>
            )
        )
    }

    function handleDelete() { }
    return (
        <div className="layout" >

            <div className="title"> 제보하기</div>


            <div className="label">
                *표시된 항목은 필수입력 항목입니다.
            </div>

            <div className="item">
                <div className="info">가게 이름</div>
                <div className="content">
                    <input className="input" />
                </div>
            </div>

            <div className="item">
                <div className="info">카테고리 *</div>
                <div className="content">
                    <input className="input" />
                    <div className="categories">
                        <Chips text_list={["붕어빵/잉어빵","타코야끼","기타"]} color="primary" deleteFunction={()=>handleDelete} />
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="info">가게 위치*</div>
                <div className="content">
                    (  검색창  )
                    <div className="map-container">
                        <Map className="map" center={{ lat: 37.413294, lng: 126.79581 }} level={7}></Map>
                    </div>
                    <div className="locations">
                        <Chips text_list={["서울특별시 동대문구 서울시립대로 163"]} color="warning" deleteFunction={()=>handleDelete} />

                    </div>

                </div>
            </div>


            <div className="item">
                <div className="info">결제 수단</div>
                <div className="content">
                    <div className="payments">
                        <FormGroup className="check-agree">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="현금" />
                        </FormGroup>
                        <FormGroup className="check-agree">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="카드" />
                        </FormGroup>
                        <FormGroup className="check-agree">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="계좌이체" />
                        </FormGroup>
                        <FormGroup className="check-agree">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="카카오페이" />
                        </FormGroup>

                    </div>
                </div>

            </div>

            <div className="item">
                <div className="info">가게 사진</div>
                <div className="content">
                    <div className="image-uploader">
                        사진 업로더

                    </div>
                </div>
            </div>

            <div className="item">
                <div className="register-button"> 등록하기 </div>
            </div>

        </div>
    );
}

export default Report;