const getters = {
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    isCollapse: state => state.app.opened,
    token: state => state.user.token,
    menu: state => state.user.menu
}

export default getters