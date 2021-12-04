import axios from "axios"
import jwt from "jsonwebtoken"

/*
 * User 관련
 */
/* (jaesun comment) neccessary functions
   isIdAvailable(id) ->boolean : check the new ID is available (Sign Up)
   sendSignUpCode(email)->(???): send a code for signing up to e-mail, (return: send succeeded, email duplicated, error)
   checkSignUpCode(code)->boolean: check the code is right
    createUser(..., isOwner): add an argument that present whether new user is onwer or not
*/
// 새 사용자 계정을 생성합니다.
export async function createUser(id, pw, name, email) {
    const reqBody = {
        user_id: id,
        user_pw: pw,
        user_name: name,
        user_email: email
    };

    try {
        let res = await axios.post("/api/user", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In createUser: " + err?.response?.data);
        throw err;
    }
}

// 아이디에 해당하는 계정을 삭제합니다.
export async function deleteUser(id) {
    const reqBody = {
        user_id: id
    };

    try {
        let res = await axios.delete("/api/user", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In deleteUser: " + err?.response?.data);
        throw err;
    }
}

// 계정의 상세 정보를 가져옵니다.
export async function getUserInfo(id) {
    try {
        let res = await axios.get("/api/user/" + id, { withCredentials: true });
        return res.data.user;
    } catch (err) {
        console.error("In getUserInfo: " + err?.response?.data);
        throw err;
    }
}

// 비밀번호를 재설정합니다. (id와 oldPw가 유효한 경우에만 성공)
export async function changePassword(id, oldPw, newPw) {
    const reqBody = {
        user_id: id,
        current_pw: oldPw,
        change_pw: newPw
    };

    try {
        let res = await axios.patch("/api/password", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In changePassword: " + err?.response?.data);
        throw err;
    }
}

/*
 * 로그인/로그아웃/세션 관련
 */

// 로그인을 시도합니다. (내부적으로 브라우저의 쿠키에 사용자 정보를 기록합니다.)
export async function login(id, pw) {
    const reqBody = {
        user_id: id,
        user_pw: pw
    };

    try {
        let res = await axios.post("/api/login", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In login: " + err?.response?.data);
        throw err;
    }
}

// 로그아웃합니다.
export async function logout() {
    try {
        let res = await axios.post("/api/logout", {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In logout: " + err?.response?.data);
        throw err;
    }
}

// 현재 브라우저에서 로그인된 세션 정보를 가져옵니다.
// 로그인되어 있다면 사용자의 ID를, 되어있지 않다면 undefined를 반환합니다.
// 인자로 전달되는 cookies는 react-cookie 패키지에 포함된 withCookies로 얻을 수 있습니다. (props.cookies)
// 아래 글을 따라 컴포넌트에 withCookies를 입혀보세요!
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=dilrong&logNo=221450777898
export async function checkCurrentUserID(cookies) {
    try {
        const userToken = cookies.get('user');
        const decoded = jwt.decode(userToken);
        return decoded.user_id;
    } catch (err) {
        return undefined;
    }
}

/*
 * 즐겨찾기 관련
 */

// 특정 id를 가진 사용자의 즐겨찾기 목록을 가져옵니다.
export async function getAllFavorites(id) {
    try {
        let res = await axios.get("/api/favor/" + id, { withCredentials: true });
        return res.data.favorites;
    } catch (err) {
        console.error("In getAllFavorites: " + err?.response?.data);
        throw err;
    }
}

// 사용자의 즐겨찾기 목록에 새 항목을 추가합니다.
export async function addFavorite(id, marketIdx) {
    const reqBody = {
        user_id: id,
        market_id: marketIdx
    };

    try {
        let res = await axios.patch("/api/favor/add", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In addFavorite: " + err?.response?.data);
        throw err;
    }
}

// 사용자의 즐겨찾기 목록에 새 항목을 추가합니다.
export async function removeFavorite(id, marketIdx) {
    const reqBody = {
        user_id: id,
        market_id: marketIdx
    };

    try {
        let res = await axios.patch("/api/favor/remove", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In removeFavorite: " + err?.response?.data);
        throw err;
    }
}

/*
 * Market 관련
 */

// 존재하는 모든 포장마차를 가져옵니다.
export async function getAllMarkets() {
    try {
        let res = await axios.get("/api/market", { withCredentials: true });
        return res.data.markets;
    } catch (err) {
        console.error("In getAllMarkets: " + err?.response?.data);
        throw err;
    }
}

// 특정 index에 해당하는 포장마차의 정보를 가져옵니다.
export async function getMarketInfo(marketIdx) {
    try {
        let res = await axios.get("/api/market/" + marketIdx, { withCredentials: true });
        return res.data.market;
    } catch (err) {
        console.error("In getMarketInfo: " + err?.response?.data);
        throw err;
    }
}

// 새로운 포장마차를 등록합니다.
// location: 장소 (string) --> 'string의 배열'로 변경 (jaesun comment)
// food: 파는 음식들 (string의 배열) --> categories로 변경 (jaesun comment)
// category: 포장마차의 카테고리 (string) --> 삭제 (jaesun comment)
// paymentMethods: 지불 방법 (string의 배열)
// explanation: 포장마차 설명 (string)
// images: 이미지 경로 배열 (string의 배열)
// authority: 0이면 일반 사용자, 1이면 사장님
// fixed: 0이면 이동형, 1이면 고정형 -->삭제 (jaesun comment)
// phone: 전화번호 (string)
export async function createMarket(location, food, category, paymentMethods, explanation, images, authority, fixed, phone) {
    const reqBody = {
        market_location: location,
        market_food: food,
        market_category: category,
        market_payment_method: paymentMethods,
        market_explanation: explanation,
        market_image: images,
        market_authority: authority,
        market_fixed: fixed,
        market_phone_number: phone
    };

    try {
        let res = await axios.post("/api/market", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In createMarket: " + err?.response?.data);
        throw err;
    }
}

// 포장마차를 삭제합니다.
export async function deleteMarket(marketIdx) {
    const reqBody = {
        market_index: marketIdx
    };

    try {
        let res = await axios.delete("/api/market", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In deleteMarket: " + err?.response?.data);
        throw err;
    }
}

// 포장마차 정보를 수정합니다.
// marketIdx: 포장마차 번호 (int)
// location: 장소 (string)
// food: 파는 음식들 (string의 배열)
// category: 포장마차의 카테고리 (string)
// paymentMethods: 지불 방법 (string의 배열)
// explanation: 포장마차 설명 (string)
// images: 이미지 경로 배열 (string의 배열)
// authority: 0이면 일반 사용자, 1이면 사장님
// fixed: 0이면 이동형, 1이면 고정형
// phone: 전화번호 (string)
export async function editMarket(marketIdx, location, food, category, paymentMethods, explanation, images, authority, fixed, phone) {
    const reqBody = {
        market_index: marketIdx,
        market_location: location,
        market_food: food,
        market_category: category,
        market_payment_method: paymentMethods,
        market_explanation: explanation,
        market_image: images,
        market_authority: authority,
        market_fixed: fixed,
        market_phone_number: phone
    };

    try {
        let res = await axios.patch("/api/market", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In editMarket: " + err?.response?.data);
        throw err;
    }
}

/*
 * Comment 관련
 */

// 특정 포장마차에 달린 모든 댓글을 가져옵니다.
export async function getCommentsByMarketIdx(marketIdx) {
    try {
        let res = await axios.get("/api/comment/attached/" + marketIdx, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getCommentsByMarketIdx: " + err?.response?.data);
        throw err;
    }
}

// 특정 Comment-ID에 해당하는 댓글을 가져옵니다.
export async function getCommentInfo(commentId) {
    try {
        let res = await axios.get("/api/comment/" + commentId, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getCommentInfo: " + err?.response?.data);
        throw err;
    }
}

// 새로운 댓글을 씁니다.
// contents: 댓글의 내용 (string)
// score: 점수 (숫자)
// reviewer: 댓글을 단 사람의 ID (string)
// time: 댓글을 단 시간 (Date 객체)
// target: 댓글이 달린 포장마차의 index (int)
export async function createComment(contents, score, reviewer, time, target) {
    const reqBody = {
        comment_review: contents,
        comment_score: score,
        comment_reviewer: reviewer,
        comment_time: time,
        comment_target: target
    };

    try {
        let res = await axios.post("/api/comment", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In createComment: " + err?.response?.data);
        throw err;
    }
}

// 댓글을 삭제합니다.
export async function deleteComment(commentId) {
    const reqBody = {
        comment_id: commentId
    };

    try {
        let res = await axios.delete("/api/comment", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In deleteComment: " + err?.response?.data);
        throw err;
    }
}

// 댓글을 수정합니다.
// contents: 댓글의 내용 (string)
// score: 점수 (숫자)
// reviewer: 댓글을 단 사람의 ID (string)
// time: 댓글을 단 시간 (Date 객체)
export async function editComment(commentId, contents, score, reviewer, time) {
    const reqBody = {
        comment_id: commentId,
        comment_review: contents,
        comment_score: score,
        comment_reviewer: reviewer,
        comment_time: time
    };

    try {
        let res = await axios.patch("/api/comment", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In editComment: " + err?.response?.data);
        throw err;
    }
}