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
import "../styles/Main.css"
import Login from "./Login"
import SignUp from "./SignUp"
import Report from "./Report"
import Manage from "./Manage"
import { CookiesProvider } from 'react-cookie';

function Main(props) {
    const categories = [
        "전체", "붕어빵/잉어빵", "타코야끼", "풀빵", "호떡", "군고구마", "꼬치", "분식", "기타"
    ];

    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("군것질");
    const [menuOpen, setMenuOpen] = useState(false);

    function viewLogin() {
        navigate("login");
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
        <CookiesProvider>
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
                    <Box sx={500} role="presentation">
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
                                        <ListItemText primary={cate}></ListItemText>
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
                        <Manage />
                    </div>

                    <div className="main-split-element">
                        <Map center={{ lat: 37.413294, lng: 126.79581 }} level={7} className="main-map"></Map>
                    </div>
                </div>
            </div>
        </CookiesProvider>
    );
}

export default Main;
