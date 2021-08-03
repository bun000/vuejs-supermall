<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div @click="backBtn">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            class="detail-title"
            v-for="(item, index) in titles"
            :key="item"
            :class="{ active: currentIndex === index }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backBtn() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  font-size: 15px;
}

.detail-title {
  text-align: center;
  flex: 1;
}

.active {
  color: var(--color-tint);
  border-bottom: 2px solid var(--color-tint);
}

img {
  vertical-align: middle;
}
</style>