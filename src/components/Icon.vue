<template>
  <div class="iconfont myIcon" :class="imgClassName" :style="iconStyle"></div>
</template>
<script>
export default {
  data() {
    return {
      iconStyle: "",
    };
  },
  props: ["imgClassName", "size"],
  created() {},
  mounted() {
    let iconSize = this.size || 24;
    this.iconStyle = `font-size:${iconSize}px;`;
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "@/assets/font.css";
</style>