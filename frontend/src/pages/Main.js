import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ListItem, ListSubheader, AppBar, Drawer, Toolbar, Typography, IconButton, List, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Map } from "react-kakao-maps-sdk";
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Main.css"
import { getUserCookie, removeUserCookie } from '../shared/cookie';
import { logout } from '../shared/BackendRequests';
import { categories } from '../shared/constantLists'
import Login from "./Login"
import SignUp from "./SignUp"
import Manage from "./Manage"

function Main() {


    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("군것질");
    const [menuOpen, setMenuOpen] = useState(false);
    const [marketDetailed, setMarket] = useState();
    const [isLogin, setLogin] = useState(false);
    const [detail, setDetail] = useState();
    const [level, setLevel] = useState(4);
    const user = undefined; //여기에다가 유저 담을거에요

    function isDetail() {
        console.log(detail);
        setDetail(!detail);
    }
    function checkLogin() {
        console.log('check login!');
        var isLogin = false;
        if (getUserCookie() !== undefined)
            isLogin = true;
        setLogin(isLogin)
        return isLogin

    }

    function viewLogin() {
        if (!isLogin)
            navigate("/login");
        else {
            logout();
            removeUserCookie();
        }
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

    function MyDrawer() {

        useEffect(() => {
            checkLogin();
        })

        return <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} >
            <Box role="presentation">
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <LoginIcon></LoginIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={viewLogin} primary={isLogin ? '로그아웃' : '로그인'}></ListItemText>
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

                    <ListItem button sx={{ pr: 10 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <FavoriteIcon></FavoriteIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText onClick={viewFavorite} primary="즐겨찾기"></ListItemText>
                    </ListItem>

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
                    <Route path='/login' element={<div className="main-split-element"><Login /></div>} />
                    <Route path='/signup' element={<div className="main-split-element"><SignUp /></div>} />
                    <Route path='/report' element={<div className="main-split-element"> <Manage reportManage={0} /> </div>} />
                    <Route path='/manage' element={<div className="main-split-element"> <Manage reportManage={1} /> </div>} />
                </Routes>
            </div >
        </div >

    );
}

export default Main;
