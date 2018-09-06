<template>
    <div class="gress-bar clearfix">
        <template v-if="progressData.length > 0">
            <div v-for="(item, index) in progressData" :key="index" :style="{ width: width * (item.value / total) + 'px' }" class="clearfix">
                <div :style="{ backgroundColor: item.color, maxWidth: width * (item.value / total) + 'px', boxShadow: ''}"></div>
            </div>
        </template>
    </div>
</template>

<script>
    import Charts from "@/components/Charts";
    import { debounce } from '@/utils'

    export default {
        components: {
            Charts
        },
        props: {
            progressData: {
                type: Array,
                default: () => {
                    return [
                        {
                            value: 30,
                            color: 'red'
                        },
                        {
                            value: 10,
                            color: 'green'
                        },
                        {
                            value: 15,
                            color: 'pink'
                        },
                        {
                            value: 23,
                            color: 'lightblue'
                        },
                        {
                            value: 78,
                            color: 'lightgreen'
                        }
                    ]
                }
            },
            rate: { //速率
                type: Number,
                default: 2
            }

        },
        computed: {
            total() {
                let width = 0;
                this.progressData.forEach(item => {
                    width += item.value
                })
                return width
            }
        },
        data() {
            return {
                width: 0,
                itemList: [],
                itemWidth: 0
            };
        },
        methods: {
            // 测量父级宽度
            getParentWidth() {
                this.width = this.$el.offsetWidth;
            },
            // 获取队列
            getItemList() {
                let items = this.$el.children;
                for (let i = 0 ; i < items.length; i++) {
                    this.itemList[i] = items[i].children[0]
                }
            },
            // 执行加载动画
            start(el,fn) {
                // 单个最大宽度
                this.$nextTick(() => {
                    let maxWidth = Math.ceil(Number(el.style.maxWidth.replace('px',''))) //向上取证避免bug,最大数字超过maxWidth，由其限制展示宽度
                    // 执行单个元素动画增加
                    fn(el, maxWidth)
                })
            },
            // 执行队列所有动画操作
            init() {
                this.getParentWidth();
                this.getItemList();
                let vm = this;
                let animate = (el, maxWidth) => {
                    let width = 0;
                    function move() {
                        width += vm.rate;
                        el.style.width = width + 'px';
                        if (width >= maxWidth) {
                            cancelAnimationFrame(move)
                            return
                        }
                        requestAnimationFrame(move)
                    }
                    move()
                }
                setTimeout(() => {
                    this.itemList.forEach(item => {
                        this.start(item, animate)
                    })
                },20) // 队列就绪后进行操作
            },
            resize() {
                // 由于是设置的数值不是百分比，大小变动需要重新设置
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style lang="scss" scoped>
    .gress-bar {
        height: 15px;
        border-radius: 8px;
        overflow: hidden;
        background: #ccc;
        width: 100%;
        &  div {
            float: left;
            height: 100%;
        }
    }
</style>
