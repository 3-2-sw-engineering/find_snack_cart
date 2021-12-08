// Jaesun
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from "react-kakao-maps-sdk";
import { Chip, MenuItem, Button, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../styles/Manage.css'
import { createMarket, deleteMarket, editMarket, getMarketInfo } from '../shared/BackendRequests';
import { withCookies } from 'react-cookie';
import { getUserCookie, setUserCookie } from '../shared/cookie';
import { categories as origCategories, infoPlaceHolder, paymentList } from '../shared/constantLists'

function Manage({ reportManage }) {
    // reportManage: 0-report, 1-manage
    const navigate = useNavigate();
    const categories = origCategories.filter((item, idx) => idx > 0);

    const [searchText, setsearchText] = useState("");
    const [kmap, setkMap] = useState(null);

    const changeSetLocation = (e) => {
        setsearchText(e.target.value)
    }

    const { kakao } = window;
    var geocoder = new kakao.maps.services.Geocoder();
    var placecoder = new kakao.maps.services.Places();

    const searchLocation = () => {
        geocoder.addressSearch(searchText, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                console.log(result)
                kmap.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
                return;
            }
        })
        placecoder.keywordSearch(searchText, function (data, status, pagination) {
            console.log(searchText);
            console.log(status);
            if (status === kakao.maps.services.Status.OK) {
                kmap.setCenter(new kakao.maps.LatLng(data[0].y, data[0].x));
            }
        })
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

    function viewBack() {
        if (getUserCookie() === undefined) {
            navigate("login");
        }
        navigate('../');
    }

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

    const onMarketRegister = async () => {
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
        var cate_arr = categories.filter((item, idx) => marketData.categories[idx]);
        var pay_arr = paymentList.filter((item, idx) => marketData.payments[idx]);

        // register on DB
        let user = getUserCookie();
        if (user.managing === undefined || user.managing < 0) {
            let ret = await createMarket(marketData.locations[0], cate_arr, 'cate',
                pay_arr, marketData.information, [],
                reportManage, 0, marketData.phone)
                .then(() => alert("가게 정보가 저장되었습니다."))
                .catch(() => alert("error on creating the market"));

            // add managing cart on userdata
            let managing = -1;
            setUserCookie(user.id, user.name, user.role, managing);
            if (ret === undefined) return;

        } else {
            editMarket(marketData.locations[0], cate_arr, 'cate',
                pay_arr, marketData.information, [],
                reportManage, 0, marketData.phone)
                .then(() => alert("가게 정보가 저장되었습니다."))
                .catch(() => alert("error on creating the market"));;
        }

    }

    const onMarketDelete = () => {
        var ret = window.confirm("가게정보가 삭제됩니다. 계속 하시겠습니까?");
        if (ret) {// register on DB
            let user = getUserCookie();
            if (user.managing.managing >= 0) {
                deleteMarket(user.managing);
            }
        }
        return;
    }

    const [isFirst, setIsFirst] = useState(true);
    function FillAuto() {
        if (!isFirst) return;
        setIsFirst(false);
        if (reportManage === 0) return;

        let user = getUserCookie();
        if (user === undefined) return;
        if (user.managing < 0) return;
        getMarketInfo(user.managing).then((market) => {
            let food = market.market_food;
            let pay = market.market_payment_method;
            var cate_bool = categories.map((item) => (food.includes(item)));
            var pay_bool = paymentList.map((item) => pay.includes(item));

            setMarketData({
                ...marketData,
                // name: market.name,
                categories: cate_bool,
                locations: [market.market_location],
                phone: market.market_phone_number,
                information: market.market_explanation,
                payments: pay_bool
                //image
            });

        }
        );
    }

    function checkAuthority() {
        let user = getUserCookie();
        if (user === undefined) {
            alert("로그인 후 이용해 주세요.");
            viewBack();
        } else if (reportManage === 1 && user.role !== 1) {
            alert("사장님만 이용하실 수 있습니다.");
            viewBack();
        }
    }

    useEffect(() => {
        checkAuthority();
    }, []);
    const addLocClicked = () => {
        var location = kmap.getCenter();
        geocoder.coord2Address(location.getLng(), location.getLat(), function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result[0].address.address_name);
                setMarketData({
                    ...marketData,
                    locations: marketData.locations.concat(result[0].address.address_name)
                });
            }
        })
    }


    return (
        <div className="report-layout" >
            {FillAuto()}

            <div className="title">{reportManage === 0 ? '제보하기' : '내 가게 관리하기'}</div>


            <div className="label">
                *표시된 항목은 필수입력 항목입니다.
            </div>

            <div className="item">
                <div className="info">가게 이름 *</div>
                <div className="content">
                    <input className="input" value={marketData.name} name='name' onChange={onInputTextChange} />
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
                    <div className="map-container">
                        <div className="loc-container">
                            <input className="loc-input" name='search' value={searchText} onChange={changeSetLocation}
                                placeholder="장소를 검색하실 수 있습니다." />
                            <div className="loc-button" onClick={searchLocation}> 검색</div>
                        </div>
                        <div>원하는 위치를 지도의 중심에 놓고 버튼을 클릭하세요.</div>
                        <div className="map-button" onClick={addLocClicked}> 지도 위치 등록하기 </div>
                        <Map className="map" center={{
                            lat: 37.58434776307455, lng: 127.05857621599598
                        }} level={7} onCreate={(map) => setkMap(map)}></Map>
                    </div>
                    <div className="locations" name='locations' >
                        {marketData.locations.map(loc =>
                            <div className="chip"><Chip label={loc} color="info" onDelete={locationDeleted(loc)} /></div>
                        )}

                    </div>

                </div>
            </div>
            {reportManage === 0 ? <div /> :
                <div className="item">
                    <div className="info">연락처</div>
                    <div className="content">
                        <input className="input" value={marketData.phone} name='phone' onChange={onInputTextChange} />
                    </div>
                </div>

            }

            {reportManage === 0 ? <div /> :
                <div className="item">
                    <div className="info">가게 설명</div>
                    <div className="content">
                        <textarea className="description" value={marketData.information} rows="10" name='information' onChange={onInputTextChange}
                            placeholder={infoPlaceHolder} />
                    </div>
                </div>
            }



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

            {/* <div className="item">
                <div className="info">가게 사진</div>
                <div className="content">
                    <div className="image-uploader">
                        사진 업로더
                    </div>
                </div>
            </div> */}

            <div className="item">
                <div className="register-button" onClick={onMarketRegister}> 등록하기 </div>
            </div>


            {reportManage === 0 ? <div /> :
                <div className="item">
                    <div className="delete-button" onClick={onMarketDelete}> 삭제하기 </div>
                </div>
            }

        </div >
    );
}

export default withCookies(Manage);