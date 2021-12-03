const jwt = require('jsonwebtoken');
const config = require('../config/key');
const SecretKey = config.secretKey;

function RefreshCookie(res, user_id) {
    const token = jwt.sign({
        user_id: user_id
    }, SecretKey, {
        expiresIn: '1h'
    });
    res.cookie('user', token, { sameSite: 'none', secure: false });
}

function ClearCookie(res) {
    res.clearCookie('user');
}

// 현재 브라우저에서 로그인된 세션 정보를 가져옵니다.
// 로그인되어 있다면 사용자의 ID를, 되어있지 않다면 undefined를 반환합니다.
function CheckCurrentSession(req, res) {
    try {
        const token = req.cookies["user"];
        if (!token) {
            return undefined;
        }
        const decoded = jwt.verify(token, SecretKey);
        RefreshCookie(res, decoded.user_id)
        return decoded.user_id;
    } catch (err) {
        return undefined
    }
}

module.exports = {
    refreshCookie: RefreshCookie,
    clearCookie: ClearCookie,
    checkCurrentSession: CheckCurrentSession
}