import { Routes, Route } from 'react-router-dom';
import { ListItem, ListSubheader, AppBar, Drawer, Toolbar, Typography, IconButton, List, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Map } from "react-kakao-maps-sdk";
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Main.css"
import { getUserCookie, removeUserCookie } from '../shared/cookie';
import { withCookies } from 'react-cookie';
import { logout } from '../shared/BackendRequests';
import { categories } from '../shared/constantLists'
import MarketInfoShort from './MarketInfoShort.js';
import MarketInfoDetailed from './MarketInfoDetailed.js';
import Login from "./Login"
import SignUp from "./SignUp"
import Manage from "./Manage"
import MarketListPanel from "./MarketListPanel"
import { getAllMarkets } from "../shared/BackendRequests.js";

function Main() {
    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("군것질");
    const [menuOpen, setMenuOpen] = useState(false);
    const [marketDetailed, setMarket] = useState();
    const [markets, setMarkets] = useState([]);
    const [isLogin, setLogin] = useState(false);
    const [level, setLevel] = useState(4);
    const [user, setUser] = useState();

    const [searchText, setsearchText] = useState("");

    const changeSetLocation = (e) => {
        setsearchText(e.target.value)
    }
    const [kmap, setkMap] = useState(null);

    const { kakao } = window;
    var geocoder = new kakao.maps.services.Geocoder();
    var placecoder = new kakao.maps.services.Places();
    const searchLocation = () => {
        geocoder.addressSearch(searchText, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                kmap.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
                return;
            }
        })
        placecoder.keywordSearch(searchText, function (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                kmap.setCenter(new kakao.maps.LatLng(data[0].y, data[0].x));
            }
        })
    }

    function viewLogin() {
        if (!isLogin)
            navigate("/login");
    }

    function tryLogout() {
        logout();
        removeUserCookie();
        alert("로그아웃 하였습니다.");
        window.location.reload();
    }

    function viewFavorite() {
        navigate("/favorite");
    }

    function viewReport() {
        navigate("/report");
    }

    function viewManage() {
        navigate("/manage");
    }

    useEffect(() => {
        async function fetchAllMarket() {
			const information = await getAllMarkets();
			setMarkets(information);
		} fetchAllMarket();
        setUser(getUserCookie());
    }, [])

    function MyDrawer() {

        useEffect(() => {
            let isLogin = false;
            if (user !== undefined)
                isLogin = true;
            setLogin(isLogin)
        }, [])

        return <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} >
            <Box role="presentation">
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <LoginIcon></LoginIcon>
                            </Avatar>
                        </ListItemAvatar>
                        {isLogin ? (
                            <ListItemText onClick={tryLogout} primary={'로그아웃'}></ListItemText>
                        ) : (
                            <ListItemText onClick={viewLogin} primary={'로그인'}></ListItemText>
                        )}
                    </ListItem>

                    <List subheader={
                        <ListSubheader component="div">
                            카테고리
                        </ListSubheader>}>

                        {categories.map(cate => (
                            <ListItem button sx={{ pl: 10 }}>
                                <ListItemText key={cate} primary={cate}></ListItemText>
                            </ListItem>
                        ))}
                    </List>

                    {/* <ListItem button sx={{ pr: 10 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <FavoriteIcon></FavoriteIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={viewFavorite} primary="즐겨찾기"></ListItemText>
                    </ListItem> */}

                    <ListItem button sx={{ pr: 10 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <MyLocationIcon></MyLocationIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={viewReport} primary="제보하기"></ListItemText>
                    </ListItem>

                    <ListItem button sx={{ pr: 10 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <ManageSearchIcon></ManageSearchIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={viewManage} primary="내 가게 관리하기"></ListItemText>
                    </ListItem>
                </List>
            </Box>
        </Drawer>

    }
    return (
        < div className="main-layout" >
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}
                        onClick={() => setMenuOpen(true)}>
                        <MenuIcon></MenuIcon>
                    </IconButton>

                    <Typography className="main-header-text" variant="h5" component="div">
                        {`${headerText} 사장님, 어디 계세요?!`}
                    </Typography>
                </Toolbar>
            </AppBar>

            <MyDrawer />


            <div className="main-split">
                <Routes>
                    <Route path='/' element={
                        <React.Fragment><div className="main-split-element">
                            {marketDetailed ? <MarketInfoDetailed
                                setMarket={setMarket}
                                marketDetailed={marketDetailed}
                                user={user} /> : <MarketListPanel setMarket={setMarket}/>}
                        </div>
                            <div className="main-split-element">
                                <div className="search-panel">
                                    <input className="loc-input" name='search' value={searchText} onChange={changeSetLocation}
                                        placeholder="장소를 검색하실 수 있습니다." />
                                    <div className="loc-button" onClick={searchLocation}> 검색</div>
                                </div>
                                <Map className='main-map'
                                    center={{ lat: 37.55635, lng: 126.795841 }}
                                    onZoomChanged={(target) => setLevel(target.b.H)}
                                    level={4}
                                    onCreate={(map) => setkMap(map)}>
                                   {markets.map(market =>  <MarketInfoShort
                                        market={market}
                                        level={level}
                                        setMarket={setMarket} />)}
                                </Map>
                            </div></React.Fragment>} />
                    <Route path='/login' element={<div className="main-split-element"><Login /></div>} />
                    <Route path='/signup' element={<div className="main-split-element"><SignUp /></div>} />
                    <Route path='/report' element={<div className="main-split-element"> <Manage reportManage={0} /> </div>} />
                    <Route path='/manage' element={<div className="main-split-element"> <Manage reportManage={1} /> </div>} />

                </Routes>
            </div>
        </div >

    );
}

export default withCookies(Main);
