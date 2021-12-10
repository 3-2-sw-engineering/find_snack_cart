import { useState, useEffect } from 'react';
import { getAllFavorites, getAllMarkets } from '../shared/BackendRequests';
import ListItem from "../component/MarketListItem"
import "../styles/MarketListPanel.css"
import { getUserCookie } from '../shared/cookie';

function MarketListPanel(props) {
    const BY_DISTANCE = "거리순";
    const BY_RATING = "평점순";
    const BY_COMMENTS = "리뷰순";
    const BY_NEWEST = "새로운 가게";
    const BY_FAV = "즐겨찾기";
    const MENUS = [BY_DISTANCE, BY_RATING, BY_COMMENTS, BY_FAV];
    const [allMarkets, setAllMarkets] = useState([]);
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
        },
        BY_FAV: (a, b) => { // actually equals to BY_NEWEST
            return a.market_index > b.market_index;
        }
    };

    const [markets, setMarkets] = useState([]);
    const [sortBy, setSortBy] = useState(BY_DISTANCE);

    async function onMenuClick(menu) {
        setSortBy(menu);
        let markets;
        if (menu !== BY_FAV) {
            markets = allMarkets;
        }
        else {
            markets = await getFavMarkets();
        }
        if (markets.length > 2) {
            markets = markets.sort(COMPARER[menu]);
        }
        setMarkets(markets)

    }

    async function fetchMarkets() {
        try {
            const fetched = await getAllMarkets();
            fetched.sort(COMPARER[sortBy]);
            if (markets.length === 0)
                setAllMarkets(fetched);
            setMarkets(fetched);
        } catch (err) {
            alert("포장마차 목록을 가져오는데 실패하였습니다. " + err);
        }
    }
    async function getFavMarkets() {
        try {
            let user = getUserCookie();
            if (user === undefined) return [];
            if (user.id === '') return [];

            let fav = await getAllFavorites(user.id);
            return fav;
        } catch (err) {
            alert("즐겨찾기한 포장마차목록을 가져오는데 실팼습니다.")
        }
    }

    useEffect(() => {
        fetchMarkets();
    }, []);

    return (
        <div className="listpanel-root">
            <div className="listpanel-menubar">
                {MENUS.map((menu) => (
                    <div className="listpanel-menu"
                        onClick={() => onMenuClick(menu)}>
                        <span>{menu}</span>
                    </div>))}
            </div>

            <div className="listpanel-item-container">
                {markets.map(market =>
                    <ListItem market={market} onClick={props.setMarket}></ListItem>
                )}
            </div>
        </div>
    );
}

export default MarketListPanel;