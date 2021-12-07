import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export function setUserCookie(id, name, role, managing) {

    cookies.set('user_', { id: id, name: name, role: role, managing: managing });
}

export function getUserCookie() {
    try {
        const userToken = cookies.get('user_');
        return userToken;
    } catch (err) {
        return undefined;
    }
}
export function setUserCookieLogout() {
    cookies.remove('user_');
}