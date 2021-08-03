<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center><p>首页</p></template></nav-bar
    >
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @scroll-end="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-views />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />

      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView.vue";
import FeatureViews from "./childComps/FeatureViews.vue";

import NavBar from "components/common/navbar/NavBar";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

import { getMultiData, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils";
// import emitter from 'common/mitt';

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureViews,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      saveY: 0,
      isTabFixed: false,
      tabOffsetTop : 0
    };
  },
  created() {
    // 1. 请求多个数据
    this.getMultiData();
    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");    
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.y;
  },
  methods: {
    // 网络请求相关
    getMultiData() {
      getMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        // console.log(this.goods[type]);
        this.goods[type].page += 1;
      });
    },
    // 事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    
    // 下拉加载更多，请求下一页图片
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted(){
    // 3. 监听图片加载
    // const refresh = debounce(this.$refs.scroll.refresh)
    // this.$bus.$on('itemIamgeLoad',()=>{
    //   // console.log('------hh----');
    //   refresh()
    // })
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  z-index: 9;

  /* position: fixed;
  top: 0;
  left: 0; */
}

.content {
  /* height: 640px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
