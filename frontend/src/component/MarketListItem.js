import { Typography, Rating, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultImage from "../images/붕어빵1.jpg"
import "../styles/MarketListItem.css"

function MarketListItem(props) {
    const { market, removable, onRemove, onClick } = props;
    const [image, setImage] = useState(defaultImage);
    const [foodList, setFoodList] = useState(["기타"]);
    const [title, setTitle] = useState("제목 없는 포장마차");
    const [dist, setDist] = useState(0)
    const [rating, setRating] = useState(5);

    function getImageByFood(food) {
        // not implemented
        return defaultImage;
    }

    function getDistByGeo() {
        return 1;
    }

    useEffect(() => {
        setImage(getImageByFood(market.food));
        setFoodList(market.market_food);
        setTitle(market.market_title);
        setDist(getDistByGeo());
        setRating(market.market_rating);
    }, [market]);

    function handleRemove() {
        if (onRemove) {
            onRemove(market);
        }
    }

    function handleClick() {
        if (onClick) {
            onClick(market);
        }
    }

    return (
        <div className="listitem-root" onClick={onClick ? handleClick : undefined}>
            <div className="listitem-image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="listitem-description">
                <Typography variant="subtitle2">{foodList.join(", ")}</Typography>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="subtitle2">{`${dist} km`}</Typography>
                <Rating value={rating} readOnly></Rating>
            </div>
            {removable && (
                <div className='listitem-remove'>
                    <IconButton onClick={handleRemove} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
}

export default MarketListItem;