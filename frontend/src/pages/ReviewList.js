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

	const fullStar = Array.from({length:4}, (v,i) => i);
	const lineStar = Array.from({length:1}, (v,i) => i);
	const [reviewList, setReviewList] = useState(true);

	// useEffect(() => {
	// 	async function fetchAllReview() {
	// 		const information = await getCommentsByMarketIdx(props.marketIdx);
	// 		setReviewList(information);
	// 	} fetchAllReview();
	// }, []);

	return reviewList? (
		<div>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src={imgB} />
				</ListItemAvatar>
				<ListItemText
					primary={<div className='detailed-review-ministars'><div>
					{fullStar.map((index) => <TiStarFullOutline key = {index} size='20' color='#93BDF9' />)}
					{lineStar.map((index) => <TiStarOutline key = {index} size='20' color='#93BDF9' />)}
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
		</div>
	) : (<div></div>)
}

export default ReviewList;