import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from 'react';
import "../styles/MarketInfoShort.css";
import { motion } from 'framer-motion/dist/es/index';
import imgA from "../images/background.jpeg";
import { BsTelephone, BsShare } from 'react-icons/bs';
import { CgArrowsExpandUpLeft } from 'react-icons/cg'
import { BiNavigation } from "react-icons/bi";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

function MarketInfoShort(props) {

	const [phoneNumber, onPhoneNumber] = useState();
	const [share, setShare] = useState();
	const down = 5;

	let divWidth = String((9 - props.level) * 60) + 'px';
	let divHeight = String((9 - props.level) * 50) + 'px';
	let url = 'https://map.kakao.com/link/to/포장마차,' + props.coodinate.lat + ',' + props.coodinate.lng;

	async function handleCopyClipBoard(text) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (error) {
		}
	}

	return props.market ? (
		<CustomOverlayMap position={props.coodinate}>
			<div className="short"
				style={{
					width: divWidth,
					height: divHeight
				}}>
				<img className='short-image' src={props.image} alt="Avatar" />
				<p className='short-title'>{props.market.market_title}</p>
				{props.level < 6 ? (<div className="short-contents">
					<p>
					{props.market.market_explanation}<br/> 카테고리: {props.market.market_food.join('/')}<br /> 결제방법: {props.market.market_payment_method.join('/')}
					</p>
				</div>) : (<div></div>)}
				{props.level < 4 ? (<div className="short-buttons">
					<motion.button
						onClick={(e) => { onPhoneNumber(true) }}
						whileTap={{ y: down }}>
						<div><BsTelephone size='20' color='#93BDF9' /></div>전화번호</motion.button>
					<motion.button onClick={() => window.open(url, '_blank')} whileTap={{ y: down }}><div><BiNavigation size='20' color='#93BDF9' /></div>길찾기</motion.button>
					<motion.button onClick={(e) => { setShare(true); handleCopyClipBoard(url); }} whileTap={{ y: down }}><div><BsShare size='20' color='#93BDF9' /></div>공유하기</motion.button>
					<motion.button onClick={() => {
						props.setMarket(props.market);
						props.setCoordinate(props.coodinate);
						props.setImageMarket(props.index)}}
						whileTap={{ y: down }}
						>
						<div><CgArrowsExpandUpLeft size='20' color='#93BDF9' /></div>자세히</motion.button>
				</div>) : <div></div>}
				<Dialog onClose={() => { onPhoneNumber(false); }} open={phoneNumber}>
					<DialogTitle onClose={() => { onPhoneNumber(false); }}>전화번호</DialogTitle>
					<DialogContent>
						{props.market.market_phone_number}
					</DialogContent>
				</Dialog>
				<Dialog onClose={() => { setShare(false); }} open={share}>
					<DialogTitle onClose={() => { setShare(false); }}>클립보드</DialogTitle>
					<DialogContent>
						링크가 복사되었습니다.
					</DialogContent>
				</Dialog>
			</div>
		</CustomOverlayMap>
	) : (<div></div>)
}

MarketInfoShort.defaultProps = {
	coodinate: { lat: 37.55635, lng: 126.795841 }
}

export default MarketInfoShort;