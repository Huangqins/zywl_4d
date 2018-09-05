import Api from '../../api'
import { setUserName, setToken } from '@/utils/auth'
const user = {
    state: {
        userName: '',
        password: '',
        userId: 0,
        token: '',
    },
    mutations: {
        'SET_USER_NAME': (state, userName) => {
            state.userName = userName
        },
        'SET_USERID': (state, userId) => {
            state.userId = userId
        },
        'SET_TOKEN': (state, token) => {
            state.token = token
        }
    },
    actions: {
        async Login({commit}, userInfo) {
            let res = await Api.login(userInfo);
            if (res.data.result === 0) {
                commit('SET_USER_NAME', res.data.userName)
                setUserName(res.data.userName)
                commit('SET_USERID', res.data.userId)
                commit('SET_TOKEN', res.data.token)
                setToken(res.data.token)
            }
            return res //返回登录结果给登录页
        }
    }
}
export default user