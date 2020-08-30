<template>
  <div class="language-container" v-bind:class="{towardTop:showSelect, towardBottom:!showSelect}">
    <div class="language-field" @click="changeLanguage">{{selectedLanguage}}</div>
    <div v-if="showSelect" class="selected">
      <div class="language-field" @click="clickChinese">简体中文</div>
      <div class="language-field" @click="clickEnglish">English</div>
    </div>
  </div>
</template>

<script>
import { setLocale, getLocale } from "@/languages";

const LANGUAGE_MAP = { cn: "简体中文", en: "English" };
export default {
  data() {
    return {
      selectedLanguage: LANGUAGE_MAP[getLocale()],
      showSelect: false,
    };
  },
  created() {},
  methods: {
    changeLanguage() {
      if (this.selectedLanguage == "") {
        this.selectedLanguage = LANGUAGE_MAP[getLocale()];
      } else {
        this.selectedLanguage = "";
      }
      this.showSelect = !this.showSelect;
    },
    clickChinese() {
      this.selectedLanguage = LANGUAGE_MAP["cn"];
      this.showSelect = false;
      setLocale(this, "cn");
    },
    clickEnglish() {
      this.selectedLanguage = LANGUAGE_MAP["en"];
      this.showSelect = false;
      setLocale(this, "en");
    },
  },
};
</script>

<style lang="less">
.language-container {
  position: absolute;
  font-size: 12px;
  border-radius: 3px;
  border: 0.5px solid #d9d9d9;
  right: 10px;
  top: 10px;
  width: 70px;
  padding: 1px;
  &.towardTop {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }
  &.towardBottom {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 4px;
      right: 8px;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }
  .language-field {
    width: 50px;
    height: 17px;
  }
}
</style>