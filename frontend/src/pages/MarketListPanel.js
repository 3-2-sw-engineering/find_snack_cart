import { useState, useEffect } from 'react';
import { getAllFavorites, getAllMarkets } from '../shared/BackendRequests';
import ListItem from "../component/MarketListItem"
import "../styles/MarketListPanel.css"
import { getUserCookie } from '../shared/cookie';
import useQueryParams from "../shared/useQuery";
import { categories, BY_COMMENTS, BY_DISTANCE, BY_FAV, BY_NEWEST, BY_RATING, MENUS } from '../shared/constantLists'


function MarketListPanel(props) {
    const [allMarkets, setAllMarkets] = useState([]);
    const [favMarkets, setFavMarkets] = useState([]);
    const query = useQueryParams();
    const activeMenu = props.activeMenu;
    // props.setActivemenu() 
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

    async function onMenuClick(menu) {
        props.setActiveMenu(menu);
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
            let fetched = await getAllMarkets();
            const food = query.get("food");
            if (food && food !== "전체") {
                fetched = fetched.filter(market => market.market_food.includes(food));
            }

            fetched.sort(COMPARER[activeMenu]);
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
            const food = query.get("food");
            // if (food && food !== "전체") {
            //     fav = fav.filter(market => market.market_food.includes(food));
            // }
            setFavMarkets(fav)
            return fav;
        } catch (err) {
            alert("즐겨찾기한 포장마차목록을 가져오는데 실팼습니다.")
        }
    }

    useEffect(() => {
        fetchMarkets();
        getFavMarkets();
        if (!MENUS.includes(activeMenu)) props.setActiveMenu(BY_DISTANCE);
        onMenuClick(activeMenu)
    }, [query.get("food"), activeMenu]);

    return (
        <div className="listpanel-root">
            <div className="listpanel-menubar">
                {MENUS.map((menu) => (
                    <div className={menu === activeMenu ? "listpanel-menu-pressed" : "listpanel-menu"}
                        onClick={() => onMenuClick(menu)}>
                        <span>{menu}</span>
                    </div>))}
            </div>

            <div className="listpanel-item-container">
                {markets.map(market =>
                    <ListItem
                        market={market}
                        onClick={() => {
                            props.setMarket(market);
                            props.setCoordinate({
                                lat: market.market_locy[0],
                                lng: market.market_locx[0]
                            })
                        }}></ListItem>
                )}
            </div>
        </div>
    );
}

export default MarketListPanel;