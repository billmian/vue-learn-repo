<template>
  <div class="profile-container">
    <title-bar :title="personalInfo"></title-bar>
    <div class="info-block">
      <div class="item-block">
        <div class="key">{{ $t("DAIMIAN_018") }}：</div>
        <div class="value">{{ name }}</div>
      </div>
      <div class="item-block">
        <div class="key">{{ $t("DAIMIAN_019") }}：</div>
        <div class="value">{{ phone }}</div>
      </div>
      <div class="item-block">
        <div class="key">{{ $t("DAIMIAN_020") }}：</div>
        <div class="value">{{ balance }}</div>
      </div>
      <!-- <div class="item-block">
        <div class="key">{{ $t("DAIMIAN_021") }}：</div>
        <div class="value">{{ identity }}</div>
      </div> -->
      <div class="item-block">
        <div class="key">{{ $t("DAIMIAN_035") }}：</div>
        <div class="value withIcon">
          <div>
            {{ languageName }}
          </div>
          <div class="arrow-icon">
            <my-icon
              imgClassName="icon-jiantou-copy-copy-copy"
              size="18"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="sign-out-container" @click="clickSignOut">
        <div class="sign-out-button">{{ $t("DAIMIAN_034") }}</div>
      </div>
    </div>
  </div>
</template>
<script>
//姓名 电话  学号 身份
import { titleBar, myIcon } from "@/components";
import store from "@/store";
import http from "@/http";
import { getLocale, LANGUAGENAME } from "@/languages";

export default {
  data() {
    return {
      name: "",
      phone: "",
      balance: "",
      identity: "",
    };
  },
  created() {
    http
      .post("http://localhost:3000/User/cgi/getUserInfo", {
        uid: store.state.uid,
      })
      .then((res) => {
        this.name = res.data.data.user_name;
        this.phone = res.data.data.user_phone;
        this.balance = res.data.data.user_balance;
        this.identity = res.data.data.user_type;
      });
  },
  mounted() {},
  components: {
    titleBar,
    myIcon,
  },
  computed: {
    personalInfo() {
      return this.$t("DAIMIAN_022");
    },
    languageName() {
      return LANGUAGENAME[getLocale()];
    },
    lists() {
      return {
        name: store.state.name,
        phone: store.state.phone,
        studentId: store.state.studentId,
      };
    },
  },
  methods: {
    clickSignOut() {
      this.$router.push({
        path: "/login",
      });
      store.commit("SELECTED_PAGE", "food");
    },
  },
};
</script>
<style lang="less" scoped>
.profile-container {
  font-family: PingFangSC-Regular;
  min-height: calc(100vh - 55px);
  background: @MTBackgound;
  .info-block {
    margin-top: 10px;
    .item-block {
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 47px;
      border-bottom: 1px solid #ddd8ce;
      background-color: @white;
      .key {
        color: #8c8c8c;
      }
    }
  }
}
.sign-out-container {
  margin: 14px 10px;
  .sign-out-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: @white;
    background-color: @red4;
    height: 45px;
  }
}
.withIcon {
  display: flex;
}
.arrow-icon {
  margin-left: 4px;
  color: gray;
}
</style>