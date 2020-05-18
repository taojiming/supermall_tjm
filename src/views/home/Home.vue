/**
问题：
  1.购物街没有居中对齐 
  2.从其他界面切回Home，应该回到原先离开home的位置，可是有时会回到顶部 为什么呢
 */

<template>
  <div id="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tabControl1" ref="tabControl1" v-show="isShow" @tabClick="tabClick"></tab-control>
    <scroll
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      ref="scroll"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop"></back-top>
  </div>
</template>

<script>
// 导航条
import NavBar from "components/common/navBar/NavBar";
// 轮播图
import HomeSwiper from "views/home/homeComps/HomeSwiper";
//推荐
import RecommendView from "views/home/homeComps/RecommendView";
//本周流行
import FeatureView from "./homeComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
// 商品
import GoodsList from "components/content/goods/GoodsList";

//BScroll
import Scroll from "components/common/scroll/Scroll";
// backTop
import BackTop from "components/content/backTop/BackTop";
// 网络请求相关的函数
import { getHomeMultiData, getHomeGoodsData } from "network/home.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      // 保存商品
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      showBackTop: false,
      isShow: false,
      saveY: -220
    };
  },
  created() {
    // 请求轮播图数据
    this._getHomeMultiData();
    // 请求商品数据
    this._getHomeGoodsData("pop");
    this._getHomeGoodsData("new");
    this._getHomeGoodsData("sell");

    // 监听事件总线
    this.$bus.$on("imageLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  activated() {
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // this.saveY = this.$refs.scroll.getScrollY();
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {},
  methods: {
    // 切换商品
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    loadMore() {
      this._getHomeGoodsData(this.currentType);
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      const positionY = -position.y;
      this.showBackTop = positionY > 1000;

      this.isShow = positionY > this.$refs.tabControl2.$el.offsetTop;
    },
    /*
     网络请求相关的函数
    */
    _getHomeMultiData() {
      return getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    _getHomeGoodsData(type) {
      const page = this.goods[type].page;
      return getHomeGoodsData(type, page).then(res => {
        const newList = res.data.data.list;
        this.goods[type].list.push(...newList);
        this.goods[type].page += 1;

        this.$refs.scroll.finishedPullUp();
      });
    }
  }
};
</script>

<style scoped>
.content {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
.tabControl1 {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.center {
  text-align: center;
}
</style>
