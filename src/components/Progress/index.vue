<template>
    <div class="progress" :data-now="rate" :data-ing="ing">
        <div class="bar" :style="{width: rate}"></div>
    </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 100
    }
    // now: {
    //   type: Number,
    //   default: () => {
    //     let value = Number((Math.random() * 100).toFixed(2));
    //     return value;
    //   }
    // }
  },
  computed: {
    rate() {
      return (this.now / this.max) * 100 + "%";
    },
    ing() {
        return `${this.now}/${this.max}`
    }
  },
  data() {
    return {
      now: 0
    };
  },
  created() {
    setInterval(() => {
      this.goTo();
    }, 2000);
  },
  methods: {
    goTo() {
      let value =  Math.ceil(Math.random() * 100);
      this.now = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress {
  position: relative;
  height: 8px;
  border-radius: 8px;
  background-color: black;
  .bar {
    height: 100%;
    background-color: aqua;
    border-radius: 8px;
    transition: width 0.5s ease-in 0.2s;
  }
  &::after {
      position: absolute;
      left: 5px;
      top: -15px;
      content: attr(data-ing);
      font-size: 10px;
      color: red;
  }
  &::before {
    position: absolute;
    right: 0;
    top: -15px;
    content: attr(data-now);
    font-size: 10px;
    color: red;
  }
}
</style>


