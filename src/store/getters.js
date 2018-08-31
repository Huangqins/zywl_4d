const getters = {
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    isCollapse: state => state.app.opened
}

export default getters