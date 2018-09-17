const appStore = window.sessionStorage

export function setToken(token) {
    console.log(token)
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

export function setMenu(menu) {
    return appStore.setItem('menu', JSON.stringify(menu))
}
export function getMenu() {
    return appStore.getItem('menu')
}

export function removeAll() {
    return appStore.clear()
}
