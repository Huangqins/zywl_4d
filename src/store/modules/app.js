const app = {
    state: {
        opened: true
    },
    mutations: {
        'TOGGLE_OPEN': state => {
            state.opened = !state.opened
        }
    }
}

export default app