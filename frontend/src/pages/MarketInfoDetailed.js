import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoDetailed.css";
import imgA from "../images/background.jpeg";
import imgB from "../images/붕어빵.jpg";
import { BsTelephone, BsShare } from 'react-icons/bs';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti'
import { BiNavigation } from "react-icons/bi";
import { motion, useCycle } from 'framer-motion/dist/es/index'
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


function MarketInfoDetailed() {

	const [isButton, onButton] = useState(false)

	const [isOpen, onTap] = useCycle(
		{ y: "-0%" },
		{ y: "-58%" }
	)

	const [isOpen2, onTap2] = useCycle(
		{ y: "-0%" },
		{ y: "-28%" }
	)

	function review() {
		onTap();
		if (isOpen.y !== "-0%" || isOpen2.y !== "-28%")
			onTap2();
	}

	function stop(e) {
		e.nativeEvent.stopImmediatePropagation();
		e.nativeEvent.stopPropagation();
		e.stopPropagation();
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
					<motion.button onClick={(e) => { stop(e); console.log(e) }}
						whileTap={{y:10}}><div><BsTelephone size='20' color='#93BDF9' /></div>전화하기</motion.button>
					<button><div><BiNavigation size='20' color='#93BDF9' /></div>길찾기</button>
					<button><div><BsShare size='20' color='#93BDF9' /></div>즐겨찾기</button>
					<button><div><BsShare size='20' color='#93BDF9' /></div>공유하기</button>
				</motion.div>
				<p>
					평점: 5.0 <br /> 영업시간: 10:00 ~ 20:00 <br /> 결제방법: 현금/카드/계좌이체/카카오페이
				</p>
			</motion.div>
			<motion.div class="detailed-review"
				animate={isOpen}
				onTap={review}
			>
				<div className="detailed-review-stars">
					<TiStarOutline size='50' color='#93BDF9' />
					<TiStarOutline size='50' color='#93BDF9' />
					<TiStarOutline size='50' color='#93BDF9' />
					<TiStarOutline size='50' color='#93BDF9' />
					<TiStarOutline size='50' color='#93BDF9' />
				</div>
				<button>댓글 작성하기</button>
				<List sx={{ width: '100%', maxWidth: '90%', bgcolor: 'background.paper' }}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src={imgB} />
						</ListItemAvatar>
						<ListItemText
							primary={<div className='detailed-review-ministars'><div>
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								</div>
								<p>2021-11-22</p>
							</div>}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Ali Connors
									</Typography>
									{" — I'll be in your neighborhood doing errands this…"}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Travis Howard" src={imgB} />
						</ListItemAvatar>
						<ListItemText
							primary={<div className='detailed-review-ministars'><div>
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								</div>
								<p>2021-11-22</p>
							</div>}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										to Scott, Alex, Jennifer
									</Typography>
									{" — Wish I could come, but I'm out of town this…"}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Cindy Baker" src={imgB} />
						</ListItemAvatar>
						<ListItemText
							primary={<div className='detailed-review-ministars'><div>
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								<TiStarOutline size='20' color='#93BDF9' />
								</div>
								<p>2021-11-22</p>
							</div>}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Sandra Adams
									</Typography>
									{' — Do you have Paris recommendations? Have you ever…'}
								</React.Fragment>
							}
						/>
					</ListItem>
				</List>
			</motion.div>
		</div>
	)
}

export default MarketInfoDetailed;