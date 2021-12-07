import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoDetailed.css";
import imgA from "../images/background.jpeg";
import ReviewList from "./ReviewList"
import { BsTelephone, BsShare } from 'react-icons/bs';
import { TiStarFullOutline, TiStarOutline, TiHeart, TiHeartOutline} from 'react-icons/ti'
import { BiNavigation } from "react-icons/bi";
import { motion, useCycle } from 'framer-motion/dist/es/index'
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

function MarketInfoDetailed(props) {

	const [isReview, onReview] = useState(false);
	const [phoneNumber, onPhoneNumber] = useState();

	const [TextFullStar, onTextFullStar] = useState([0, 1, 2, 3, 4]);
	const [TextLineStar, onTextLineStar] = useState([]);

	const [TextInput, onTextInput] = useState('');
	const [TextLen, onTextLen] = useState('0');

	const [isOpen, onTap] = useCycle(
		{ y: "-0%" },
		{ y: "-56%" }
	)

	const [isOpen2, onTap2] = useCycle(
		{ y: "-0%" },
		{ y: "-26%" }
	)

	const fullStar = Array.from({ length: 4 }, (v, i) => i);
	const lineStar = Array.from({ length: 1 }, (v, i) => i);

	function writeReview() {
		if (isOpen2.y === "-0%")
			review();
		onReview(!isReview);
	}

	function review() {
		onTap();
		if (isOpen.y !== "-0%" || isOpen2.y !== "-26%")
			onTap2();
	}

	function TextStarSelect(num) {
		onTextFullStar(Array.from({ length: num }, (v, i) => i));
		onTextLineStar(Array.from({ length: 5 - num }, (v, i) => i));
	}

	function stop(e) {
		e.nativeEvent.stopImmediatePropagation();
		e.nativeEvent.stopPropagation();
		e.stopPropagation();
	}

	function handleChange(event) {
		onTextInput(event.target.value);
		onTextLen(event.target.value.length);
	}

	return (
		<div className="detailed">
			<motion.img className='detailed-image' src={imgA} alt="Avatar"
				whileTap={{ y: 10 }}
			/>
			<motion.div class="detailed-contents"
				animate={isOpen2}
				onClick={onTap2}
			>
				<p>
					맛있는 황금고구마 <br /> #정직한 부부가 직접 구워드립니당
				</p>
				<motion.div className='detailed-buttons'
				>
					<motion.button
						onClick={(e) => { stop(e); onPhoneNumber(true);}}
						whileTap={{ y: 3 }}>
						<div><BsTelephone size='20' color='#93BDF9' /></div>전화번호</motion.button>
					<motion.button onClick={(e) => { stop(e);}} whileTap={{ y: 3 }}><div><BiNavigation size='20' color='#93BDF9' /></div>길찾기</motion.button>
					<motion.button onClick={(e) => { stop(e);}} whileTap={{ y: 3 }}><div><TiHeart size='20' color='#93BDF9' /></div>즐겨찾기</motion.button>
					<motion.button onClick={(e) => { stop(e);}} whileTap={{ y: 3 }}><div><BsShare size='20' color='#93BDF9' /></div>공유하기</motion.button>
				</motion.div>
				<p>
					평점: 5.0 <br /> 영업시간: 10:00 ~ 20:00 <br /> 결제방법: 현금/카드/계좌이체/카카오페이
				</p>
			</motion.div>
			<motion.div class="detailed-review"
				animate={isOpen}
				onClick={review}
			>
				<div className="detailed-review-stars">
					{fullStar.map((index) => <TiStarFullOutline key={index} size='50' color='#93BDF9' />)}
					{lineStar.map((index) => <TiStarOutline key={index} size='50' color='#93BDF9' />)}
				</div>
				<motion.button onClick={(e) => { stop(e); writeReview(); }} whileTap={{ y: -3 }}>댓글 작성하기</motion.button>
				<List sx={{ width: '100%', maxWidth: '90%', bgcolor: 'background.paper' }}>
					<ReviewList />
					<ReviewList />
					<ReviewList />
				</List>
			</motion.div>
			{
				isReview &&
				<motion.div className='review' animate={{ y: "-236%" }}>
					<div>
						<p className='review-head'>
							맛있는 황금고구마 <br /> #정직한 부부가 직접 구워드립니당
						</p>
					</div>
					<div className='review-star'>
						{TextFullStar.map((index) => <button className='review-star-button' onClick={() => { TextStarSelect(index + 1) }}><TiStarFullOutline key={index} size='60' color='#F9CF93' /></button>)}
						{TextLineStar.map((index) => <button className='review-star-button' onClick={() => { TextStarSelect((5 - TextLineStar.length) + index + 1) }}><TiStarOutline key={index} size='60' color='#F9CF93' /></button>)}
					</div>
					<hr />
					<div>
						<textarea value={TextInput} className='review-textfield' maxLength={200} cols='50' rows='17' onChange={handleChange}
						/>
					</div>
					<p>{TextLen}/200</p>
					<motion.button className='review-confirm' onClick={(e) => { stop(e); writeReview(); console.log(TextInput) }} whileTap={{ y: -3 }}>
						완료
					</motion.button>
				</motion.div>
			}
			<Dialog onClose={() => {onPhoneNumber(false);}} open={phoneNumber}>
			<DialogTitle onClose={() => {onPhoneNumber(false);}}>전화번호</DialogTitle>
			<DialogContent>
				{props.marketDetailed.market_phone_number}
			</DialogContent>
			</Dialog>
		</div>
	)
}

export default MarketInfoDetailed;