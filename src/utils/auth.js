const appStore = window.sessionStorage

export function setToken(token) {
    return appStore.setItem('token', token)
}

export function getToken() {
    return appStore.getItem('token')
}
export function setUserName(userName) {
    return appStore.setItem('userName', userName)
}

export function getUserName() {
    return appStore.getItem('userName')
}
