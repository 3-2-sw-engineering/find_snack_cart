import { useState, useEffect } from 'react';
import { getAllMarkets } from '../shared/BackendRequests';
import ListItem from "../component/MarketListItem"
import "../styles/MarketListPanel.css"

function MarketListPanel(props) {
    const BY_DISTANCE = "거리순";
    const BY_RATING = "평점순";
    const BY_COMMENTS = "리뷰순";
    const BY_NEWEST = "새로운 가게";
    const MENUS = [BY_DISTANCE, BY_RATING, BY_COMMENTS, BY_NEWEST];

    const COMPARER = {
        BY_DISTANCE: (a, b) => {
            // not implemented
            return a.market_index < b.market_index;
        },
        BY_RATING: (a, b) => {
            return a.market_rating > b.market_rating;
        },
        BY_COMMENTS: (a, b) => {
            return a.market_comments_count > b.market_comments_count;
        },
        BY_NEWEST: (a, b) => {
            return a.market_index > b.market_index;
        }
    };

    const [markets, setMarkets] = useState([]);
    const [sortBy, setSortBy] = useState(BY_DISTANCE);

    async function fetchMarkets() {
        try {
            const fetched = await getAllMarkets();
            console.log(fetched)
            fetched.sort(COMPARER[sortBy]);
            setMarkets(fetched);
        } catch (err) {
            alert("포장마차 목록을 가져오는데 실패하였습니다. " + err);
        }
    }

    useEffect(() => {
        fetchMarkets();
    }, []);

    return (
        <div className="listpanel-root">
            <div className="listpanel-menubar">
                {MENUS.map(menu => (<div className="listpanel-menu">
                    <span>{menu}</span>
                </div>))}
            </div>
            {markets.map(market => 
                <ListItem market={market}></ListItem>
            )}
        </div>
    );
}

export default MarketListPanel;