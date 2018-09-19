/* 通过 mixins去解决路由传值持久化问题
 * 统一设定值为pageInfo
 */

const pageStore = window.sessionStorage;
module.exports = {
    data() {
        return {
            pageInfo: {}
        }
    },
    created() {
        this.setPageStore()
    },
    methods: {
        setPageStore() {
            // 如果已存在需要保留,否则刷新依旧消失
            if (pageStore.getItem('pageInfo')) {
                this.pageInfo = JSON.parse(pageStore.getItem('pageInfo'))
                return
            } else {
                pageStore.setItem('pageInfo', JSON.stringify(this.$route.params))
                this.pageInfo = JSON.parse(pageStore.getItem('pageInfo'))
            }
        }
    },
    beforeDestroy() {
        pageStore.removeItem('pageInfo')
    }
}