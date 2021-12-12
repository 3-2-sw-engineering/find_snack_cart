import { Cookies } from 'react-cookie'
import { getUserInfo } from './BackendRequests';
const cookies = new Cookies()
export async function refreshUserCookie(id) {
    getUserInfo(id)
        .then((loginUser) => {
            setUserCookie(id, loginUser.user_name, loginUser.role, loginUser.managing);
        }
        )
        .catch(() => {
            setUserCookie('', '', 0, -1)
        });

}
export function setUserCookie(id, name, role, managing) {

    cookies.set('user_', { id: id, name: name, role: role, managing: managing });
}

export function getUserCookie() {
    try {
        const userToken = cookies.get('user_');
        if (userToken.id === '') return undefined;
        return userToken;
    } catch (err) {
        return undefined;
    }
}
export function removeUserCookie() {
    try {
        cookies.set('user_', { id: '', name: '', role: 0, managing: -1 });

    } catch (err) { }
}