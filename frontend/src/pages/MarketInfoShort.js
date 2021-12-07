import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoShort.css";
import {motion} from 'framer-motion/dist/es/index';
import imgA from "../images/background.jpeg";
import { BsTelephone, BsShare } from 'react-icons/bs';
import {CgArrowsExpandUpLeft} from 'react-icons/cg'
import { BiNavigation } from "react-icons/bi";
import { getMarketInfo } from "../shared/BackendRequests.js";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

function MarketInfoShort(props) {

	const [market, SetMarket] = useState();
	const [phoneNumber, onPhoneNumber] = useState();
	const down = 5;

	useEffect(() => {
		async function fetchAllMarket() {
			const information = await getMarketInfo(1);
			SetMarket(information);
		} fetchAllMarket();
	}, []);

	console.log(market);

	return market ? (
		<CustomOverlayMap position={{ lat: 37.55635, lng: 126.795841 }}>
			<div className="short">
				<img className='short-image' src={imgA} alt="Avatar" />
				<div className="short-contents">
					<p>
						{props.text} <br /> {market.market_explanation} <br /> 영업시간: 10:00 ~ 20:00 <br /> 결제방법: {market.market_payment_method.join('/')}
					</p>
				</div>
				<div className="short-buttons">
				<motion.button
						onClick={(e) => { onPhoneNumber(true)}}
						whileTap={{ y: down }}>
						<div><BsTelephone size='20' color='#93BDF9' /></div>전화번호</motion.button>
					<motion.button whileTap={{ y: down }}><div><BiNavigation size='20' color='#93BDF9' /></div>길찾기</motion.button>
					<motion.button whileTap={{ y: down }}><div><BsShare size='20' color='#93BDF9' /></div>공유하기</motion.button>
					<motion.button onClick={()=>{props.isDetail(); props.setMarket(market);}} whileTap={{ y: down}}><div><CgArrowsExpandUpLeft size='20' color='#93BDF9' /></div>자세히</motion.button>
				</div>
				<Dialog onClose={() => {onPhoneNumber(false);}} open={phoneNumber}>
			<DialogTitle onClose={() => {onPhoneNumber(false);}}>전화번호</DialogTitle>
			<DialogContent>
				{market.market_phone_number}
			</DialogContent>
			</Dialog>
			</div>
		</CustomOverlayMap>
	) : (<div></div>)
}

export default MarketInfoShort;