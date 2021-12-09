import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/MarketInfoDetailed.css";
import imgB from "../images/붕어빵.jpg";
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti'
import { getCommentsByMarketIdx } from "../shared/BackendRequests.js";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function ReviewList(props) {

	// console.log(props.review.score)
	const fullStar = Array.from({ length: props.review.comment_score }, (v, i) => i);
	const lineStar = Array.from({ length: 5 - props.review.comment_score }, (v, i) => i);

	return (<div>
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src={imgB} />
			</ListItemAvatar>
			<ListItemText
				primary={<div className='detailed-review-ministars'><div>
					{fullStar.map((index) => <TiStarFullOutline key={index} size='20' color='#93BDF9' />)}
					{lineStar.map((index) => <TiStarOutline key={index} size='20' color='#93BDF9' />)}
				</div>
					<p>{props.review.comment_time}</p>
				</div>}
				secondary={
					<React.Fragment>
						<Typography
							sx={{ display: 'inline' }}
							component="span"
							variant="body2"
							color="text.primary"
						>
							{props.review.comment_reviewer}
							<br />
						</Typography>
						{props.review.comment_review}
					</React.Fragment>
				}
			/>
		</ListItem>
		<Divider variant="inset" component="li" />
	</div>)
}

ReviewList.defaultProps = {
	review: {
		comment_review: '맛있다... 한입만 더 먹고 싶은 맛',
		comment_score: 4,
		comment_reviewer: '데리야끼',
		comment_time: '2100-10-29'
	}
}

export default ReviewList;