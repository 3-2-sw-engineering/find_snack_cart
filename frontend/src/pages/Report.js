// Jaesun
// Jaesun
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from "react-kakao-maps-sdk";
import { Chip, MenuItem, Button, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import '../shared/BackendRequests'
import { checkCurrentUserID, createMarket, editMarket, getUserInfo } from '../shared/BackendRequests';


import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
function Report() {
    const navigate = useNavigate(); const paymentList = ['현금', '카드', '계좌이체', '카카오페이'];
    const categories = [
        "붕어빵/잉어빵", "타코야끼", "풀빵", "호떡", "군고구마", "꼬치", "분식", "기타"
    ];
    const [propTypes, setProp] = useState({
        cookies: instanceOf(Cookies).isRequired
    })

    function viewBack() {
        navigate('../');
    }

    const [marketData, setMarketData] = useState({
        name: '',
        categories: categories.map(c => false),
        locations: ["서울특별시 동대문구 전농로163"],
        phone: '',
        information: '',
        payments: paymentList.map(p => false),
        image: ''
    });

    const onInputTextChange = (e) => {
        const { value, name } = e.target;
        setMarketData({
            ...marketData,
            [name]: value
        });
    }

    const categoryDeleted = (name) => (() => {
        var new_cate = marketData.categories.map(p => p);
        new_cate[name] = false;
        setMarketData({
            ...marketData,
            categories: new_cate
        });
        return;
    }

    )
    const locationDeleted = (loc) => () => {
        setMarketData({
            ...marketData,
            locations: marketData.locations.filter(l => l !== loc)
        })

    }

    const DropDownList = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const itemChoose_handleClose = (name) => () => {

            var new_cate = marketData.categories.map(p => p);
            new_cate[name] = true;
            setMarketData({
                ...marketData,
                categories: new_cate
            });
            setAnchorEl(null);
        }
        return (
            <div>
                <Button
                    aria-controls="demo-customized-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    // variant="contained"
                    // disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    음식 카테고리 선택
                </Button>
                <Menu
                    id="simple-menu"
                    // classes={{ paper:downloadMenuClasses.paper }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <GetMenuItems handleClose={itemChoose_handleClose} />
                </Menu>
            </div>
        );
    }
    const GetMenuItems = ({ handleClose }) => {
        return (
            categories.map(
                (cate, idx) =>
                    <MenuItem onClick={handleClose(idx)} disableRipple>
                        {cate}
                    </MenuItem>
            )
        );
    };
    const onCheckChange = (e) => {
        const { checked, name } = e.target;
        var new_payments = marketData.payments.map(p => p);
        new_payments[name] = checked;
        setMarketData({
            ...marketData,
            payments: new_payments
        });

    }

    const onMarketRegister = () => {
        var name = marketData.name.replace(/\s|　/gi, ' ');
        if (name.length < 1) {
            alert("가게 이름을 입력해 주세요.");
            return;
        }
        if (marketData.categories.filter(item => item === true).length === 0) {
            alert("카테고리를 1개 이상 선택해 주세요");
            return;
        }
        if (marketData.locations.length === 0) {
            alert("가게 위치를 1개 이상 입력해 주세요.");
            return;
        }

        // register on DB
        let user = getUserInfo(checkCurrentUserID(propTypes.cookies)); // ??
        if (true) {
            createMarket(marketData.locations[0], marketData.categories, null, marketData.payments, '',
                [marketData.image], 0, 1, '');
        } else if (true) {

            editMarket(user.managing, marketData.locations, marketData.categories, null,
                marketData.payments, marketData.information, marketData.image, 1, 0, marketData.phone);
        } else {
            viewBack();
        }

        alert("가게 정보가 저장되었습니다.");

    }



    return (
        <div className="report-layout" >

            <div className="title"> 제보하기</div>


            <div className="label">
                *표시된 항목은 필수입력 항목입니다.
            </div>

            <div className="item">
                <div className="info">가게 이름 *</div>
                <div className="content">
                    <input className="input" name='name' onChange={onInputTextChange} />
                </div>
            </div>

            <div className="item">
                <div className="info">카테고리 *</div>
                <div className="content">
                    <DropDownList />
                    <div className="categories" name='categories'>
                        {categories.map((item, idx) => marketData.categories[idx] ?
                            <div className="chip"> <Chip name={idx} label={item} color="secondary" onDelete={categoryDeleted(idx)} /> </div> :
                            <div />
                        )}
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
                    <div className="locations" name='locations'>
                        {marketData.locations.map(loc =>
                            <div className="chip"><Chip label={loc} color="info" onDelete={locationDeleted(loc)} /></div>
                        )}

                    </div>

                </div>
            </div>


            <div className="item">
                <div className="info">결제 수단</div>
                <div className="content">
                    <div className="payments">
                        {paymentList.map((item, i) =>
                            <div className="check-agree">
                                <input type="checkbox" onChange={onCheckChange} name={i} checked={marketData.payments[i]} />
                                {item}
                            </div>
                        )}
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
                <div className="register-button" onClick={onMarketRegister}> 등록하기 </div>
            </div>

        </div>
    );
}

export default withCookies(Report);