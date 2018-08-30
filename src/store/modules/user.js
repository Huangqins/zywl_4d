import Api from '../../api'

const user = {
    state: {
        userName: '',
        password: '',
        userId: 0
    },
    mutations: {
        'SET_USER_NAME': (state, userName) => {
            state.userName = userName
        },
        'SET_USERID': (state, userId) => {
            state.userId = userId
        }
    },
    actions: {
        async Login({commit}, userInfo) {
            let res = await Api.login(userInfo);
            if (res.data.result === 0) {
                commit('SET_USER_NAME', res.data.userName)
                commit('SET_USERID', res.data.userId)
            }
            return res //返回给登录页
        }
    }
}
export default user