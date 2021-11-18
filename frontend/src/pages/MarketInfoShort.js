import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoShort.css";
import imgA from "../images/background.jpeg";
import { BsTelephone, BsShare } from 'react-icons/bs';
import { BiNavigation } from "react-icons/bi";

function MarketInfoShort() {
	return (
		<CustomOverlayMap position={{ lat: 37.55635, lng: 126.795841 }}>
			<div className="short">
				<img className='short-image' src={imgA} alt="Avatar" />
				<div class="short-contents">
					<p>
						맛있는 황금고구마 #정직한 부부가 직접 구워드립니당 <br /> 평점: 5.0 <br /> 영업시간: 10:00 ~ 20:00 <br /> 결제방법: 현금/카드/계좌이체/카카오페이
					</p>
				</div>
				<div class="short-buttons">
					<button>
					<div><BsTelephone size='20' color='#93BDF9'/></div>전화하기</button>
					<button><div><BiNavigation size='20' color='#93BDF9'/></div>길찾기</button>
					<button><div><BsShare size='20' color='#93BDF9'/></div>공유하기</button>
				</div>
			</div>
		</CustomOverlayMap>
	)
}

export default MarketInfoShort;