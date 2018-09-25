import Api from '../../api'
import { setUserName, setToken, removeAll, setMenu } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router'
const user = {
    state: {
        userName: '',
        password: '',
        userId: 0,
        token: '',
        menu: []
    },
    mutations: {
        'SET_USER_NAME': (state, userName) => {
            state.userName = userName
            setUserName(userName)
        },
        'SET_USERID': (state, userId) => {
            state.userId = userId
        },
        'SET_TOKEN': (state, token) => {
            state.token = token
            setToken(token)
        },
        'REMOVE_ALL': (state) => {
            removeAll()
        },
        'SET_USER_MENU': (state, menu) => {
            state.menu = menu
            setMenu(menu)
        }
    },
    actions: {
        async Login({commit}, userInfo) {
            let res = await Api.login(userInfo);
            if (res.data.result === 0) {
                commit('SET_USER_NAME', res.data.userName)
                commit('SET_USERID', res.data.userId)
                commit('SET_TOKEN', res.data.token)
                commit('SET_USER_MENU',res.data.model)    
            }
            return res //返回登录结果给登录页
        },
        async UserExit({commit}) {
            let res = await Api.userExit();
            if (res.data.result === 0) {
                commit('REMOVE_ALL')
                Message({
                    message: '用户退出',
                    type: 'warning'
                })
                router.push({ path: 'login' })
            }
        }
    }
}
export default user