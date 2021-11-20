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
                        <div className="chip" >
                            <Chip label="붕어빵/잉어빵" color="primary" onDelete={handleDelete} />
                        </div>
                        <div className="chip" >
                            <Chip label="타코야끼" color="primary" onDelete={handleDelete} />
                        </div>
                        <div className="chip" >
                            <Chip label="기타" color="primary" onDelete={handleDelete} />
                        </div>
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
                        <div className="chip">
                            <Chip label="서울특별시 동대문구 서울시립대로 163" color="warning" onDelete={handleDelete} /></div>
                        <div className="chip">
                            <Chip label="서울특별시 마포구 ㅁㅇㄴㄻㅇㄹ" color="warning" onDelete={handleDelete} /></div>
                        <div className="chip">
                            <Chip label="제주특별자치도 서귀포시 ㅁㄴㄻㄴㅇ" color="warning" onDelete={handleDelete} /></div>

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