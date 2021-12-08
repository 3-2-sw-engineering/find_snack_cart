import { Route } from 'react-router-dom';
import { ListItem, ListSubheader, AppBar, Drawer, Toolbar, Typography, IconButton, List, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Map } from "react-kakao-maps-sdk";
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketInfoShort from './MarketInfoShort.js';
import MarketInfoDetailed from './MarketInfoDetailed.js';
import "../styles/Main.css"
import Login from "./Login"
import SignUp from "./SignUp"
import Manage from "./Manage"
import { getUserCookie } from '../shared/cookie';
import { logout } from '../shared/BackendRequests';
import { categories } from '../shared/constantLists'

function Main(props) {


    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("군것질");
    const [menuOpen, setMenuOpen] = useState(false);
    const [marketDetailed, setMarket] = useState();
    const [detail, setDetail] = useState(0);

    function isDetail() {
        console.log(detail);
        setDetail(!detail);
    }

    function viewLogin() {
        if (getUserCookie() === undefined)
            navigate("login");
        else {
            console.log("logout!")
            logout();
        }
    }

    function viewFavorite() {
        navigate("favorite");
    }

    function viewReport() {
        navigate("report");
    }

    function viewManage() {
        navigate("manage");
    }


    return (
        <div className="main-layout">
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

            <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Box role="presentation">
                    <List>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <LoginIcon></LoginIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText onClick={viewLogin} primary="로그인"></ListItemText>
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

            <div className="main-split">
                <div className="main-split-element">
                    {/* {detail && <MarketInfoDetailed marketDetailed={marketDetailed} />} */}
                    <Login />
                </div>
                <div className="main-split-element">
                    <Manage reportManage={1} />

                </div>
            </div>
        </div>
    );
}

export default Main;
