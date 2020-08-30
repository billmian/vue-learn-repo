<template>
  <div>
    <mt-header class="header" title="食堂">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {};
  },
  created() {
    console.error("这里输出：");
  },
  methods: {},
};
</script>

<style>
</style>