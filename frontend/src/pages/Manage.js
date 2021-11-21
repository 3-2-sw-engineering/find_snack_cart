// Jaesun
import * as React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Map } from "react-kakao-maps-sdk";
import { FormGroup, Checkbox, FormControlLabel, Chip, MenuItem, Button,Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../styles/Report.css'

function Manage() {
    const navigate = useNavigate();
    const paymentList =['현금', '카드', '계좌이체','카카오페이'];
    const categories = [
        "붕어빵/잉어빵", "타코야끼", "풀빵", "호떡", "군고구마", "꼬치", "분식", "기타"
    ];


    function viewBack() {
        navigate('../');
    }

    
    const Chips = ({text_list, color, deleteFunction}) =>{
        return(
            text_list.map((text)=>
            <div className="chip">
                <Chip label={text} color={color} onDelete={()=>deleteFunction()} />       
            </div>
            )
        )
    }
    const Payments = ({text_list, onCheckFunction})=>{
        return(
            text_list.map((text)=>
            
            <FormGroup className="check-agree">
            <FormControlLabel control={<Checkbox onChange={onCheckFunction} />} label={text} />
        </FormGroup>
            )
        )
    }
    const  categoryDeleted=()=>{

    }
    const  addressDeleted=()=>{

    }
    const GetMenuItems = ({handleClose})=>{
        return(
            categories.map(
                (cate)=>
                <MenuItem onClick={handleClose} disableRipple>
                 {cate}
                </MenuItem>                
            )
        );
    };
    const DropDownList = () =>{
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
          };
        return(
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
                    <GetMenuItems handleClose={handleClose}/>
                </Menu>
            </div>
          );
    }

    

    function handleDelete() { }
    return (
        <div className="report-layout" >

            <div className="title"> 내 가게 관리하기</div>


            <div className="label">
                *표시된 항목은 필수입력 항목입니다.
            </div>

            <div className="item">
                <div className="info">가게 이름 *</div>
                <div className="content">
                    <input className="input" />
                </div>
            </div>

            <div className="item">
                <div className="info">카테고리 *</div>
                <div className="content">
                    <DropDownList />
                    <div className="categories">
                        <Chips text_list={["붕어빵/잉어빵","타코야끼","기타"]} color="secondary" deleteFunction={()=>handleDelete} />
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
                        <Chips text_list={["서울특별시 동대문구 서울시립대로 163","서울특별시 마포구 ㅁㅇㄴㄻㅇㄹ","제주특별자치도 서귀포시 ㅁㄴㄻㄴㅇ" ]} 
                        color="info" deleteFunction={handleDelete} />
                       
                    </div>

                </div>
            </div>

            <div className="item">
                <div className="info">연락처</div>
                <div className="content">
                    <input className="input" />
                </div>
            </div>


            <div className="item">
                <div className="info">가게 설명</div>
                <div className="content">
                    <textarea className="description" rows="10" />
                </div>
            </div>

            <div className="item">
                <div className="info">결제 수단</div>
                <div className="content">
                    <div className="payments">
                        <Payments text_list={paymentList} onCheckFunction={()=>(null)} /> 
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

            <div className="item">
                <div className="delete-button"> 삭제하기 </div>
            </div>

        </div>
    );
}

export default Manage;