import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoDetailed.css";
import imgA from "../images/background.jpeg";
import { BsTelephone, BsShare } from 'react-icons/bs';
import { BiNavigation } from "react-icons/bi";

function MarketInfoDetailed() {
	return (
		<div className="detailed">
			<img className='detailed-image' src={imgA} alt="Avatar" />
			<div class="detailed-contents">
				<p>
					맛있는 황금고구마 <br /> #정직한 부부가 직접 구워드립니당
				</p>
				<div className='detailed-buttons'>
				<button>
					<div><BsTelephone size='20' color='#93BDF9' /></div>전화하기</button>
				<button><div><BiNavigation size='20' color='#93BDF9' /></div>길찾기</button>
				<button><div><BsShare size='20' color='#93BDF9' /></div>공유하기</button>
				<button><div><BsShare size='20' color='#93BDF9' /></div>공유하기</button>
				</div>
				<p>
					평점: 5.0 <br /> 영업시간: 10:00 ~ 20:00 <br /> 결제방법: 현금/카드/계좌이체/카카오페이
				</p>
			</div>
			<div class="detailed-review">
			</div>
		</div>
	)
}

export default MarketInfoDetailed;