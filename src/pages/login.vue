<template>
  <div>
    <div class="icon-container">
      <language></language>
      <img src="../assets/uestc.jpg" class="uestc-icon" />
    </div>
    <div class="login-title">
      <span>{{ $t("DAIMIAN_003") }}</span>
    </div>
    <div class="input-container">
      <mt-field :placeholder="studentIdPlaceholder" v-model="studentId"></mt-field>
      <mt-field :placeholder="passwordPlaceholder" v-model="password"></mt-field>
    </div>
    <div class="button-container">
      <mt-button
        type="default"
        class="login-button"
        @click.native="clickLogin"
      >{{ $t("DAIMIAN_006") }}</mt-button>
    </div>
  </div>
</template>

<script>
import { setLocale } from "@/languages";
import { language } from "@/components";
import { Toast } from "mint-ui";
import http from "@/http";
import store from "@/store";

export default {
  name: "loginPage",
  components: {
    language,
  },
  data() {
    return {
      studentId: null,
      password: null,
    };
  },
  created() {},
  mounted() {},
  computed: {
    studentIdPlaceholder: function () {
      return this.$t("DAIMIAN_004");
    },
    passwordPlaceholder: function () {
      return this.$t("DAIMIAN_005");
    },
  },
  methods: {
    //点击登录按钮进行登录检测
    clickLogin: function () {
      if (!this.studentId) {
        Toast({
          message: this.$i18n.tc("DAIMIAN_001"),
          position: "middle",
          duration: 2500,
        });
      } else if (!this.password) {
        Toast({
          message: this.$i18n.tc("DAIMIAN_002"),
          position: "middle",
          duration: 2500,
        });
      } else {
        http
          .get("/mock/studentId", {
            params: { studentId: this.studentId, password: this.password },
          })
          .then((res) => {
            //登录成功
            if (res.data.res === true) {
              //设置cookie，进行登录检测。后端检测token，如果不对则重定向到登录界面
              let { name, photo, token } = res.data;
              store.commit("CREATE_USERINFO", res.data);
              this.$cookies.set("token", token, "24h");
              this.$router.push({
                path: "/home",
              });
            } else {
              //验证失败
              Toast({
                message: this.$i18n.tc("DAIMIAN_007"),
                position: "middle",
                duration: 2500,
              });
              this.password = null;
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.icon-container {
  align-items: flex-end;
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  .uestc-icon {
    width: 100px;
    height: 100px;
  }
}
.login-title {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-container {
  margin-top: 20px;
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.button-container {
  margin-top: 10px;
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .login-button {
    width: 100%;
    margin-top: 10px;
    background: white;
    border-radius: 4px;
    border: 0.5px solid #d9d9d9;
    &:after {
      background: white;
    }
  }
}
</style>