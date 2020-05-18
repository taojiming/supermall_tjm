<template>
  <div>
    <detail-nav-bar @titleClick="titleClick" ref="detailnavbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop"></back-top>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/detailComps/DetailNavBar";
import DetailSwiper from "views/detail/detailComps/DetailSwiper";
import DetailBaseInfo from "views/detail/detailComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/detailComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/detailComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/detailComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/detailComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "views/detail/detailComps/DetailBottomBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 网络请求相关的函数
import { getDetailData, getRecommend } from "network/detail";
import { Goods, Shop, GoodsParam } from "network/detail";

import { backTopMixin } from "common/mixin.js";
import {mapActions} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // showBackTop: false,
      scrollPosition: [],
      currentIndex: 0
    };
  },
  mixins: [backTopMixin],
  created() {
    //   获取id
    this.iid = this.$route.query.iid;
    // 请求详情数据
    this._getDetailData(this.iid);
    // 推荐商品
    this._getRecommend();
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    // BackTop,
    DetailBottomBar
  },
  methods: {
    ...mapActions(['addCart']),
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // 0 2826 3679 3969 1.7976931348623157e+308
      const positionY = -position.y;
      this.showBackTop = positionY > 1000;

      for (let i = 0; i < this.scrollPosition.length; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.scrollPosition[i] &&
          positionY < this.scrollPosition[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnavbar.currentIndex = i;
        }
      }
    },
    imageLoad() {
      // 处理滚不动的情况
      this.$refs.scroll.refresh();

      const p = this.$refs.params.$el.offsetTop;
      const c = this.$refs.comment.$el.offsetTop;
      const r = this.$refs.recommends.$el.offsetTop;
      this.scrollPosition.push(0, p, c, r, Number.MAX_VALUE);
    },
    titleClick(index) {
      if (index == 0) {
        this.$refs.scroll.scrollTo(0, -this.scrollPosition[index], 0);
      } else if (index == 1) {
        this.$refs.scroll.scrollTo(0, -this.scrollPosition[index], 0);
      } else if (index == 2) {
        this.$refs.scroll.scrollTo(0, -this.scrollPosition[index], 0);
      } else {
        this.$refs.scroll.scrollTo(0, -this.scrollPosition[index], 0);
      }
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid
      //2.将商品添加到购物车里
      //3.Promist toast 
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })
      //mapActions
      this.addCart(product).then(res => {
        console.log(res)
      })
      
    },
    _getDetailData() {
      return getDetailData(this.iid).then(res => {
        console.log(res.data);
        const data = res.data;
        this.topImages = data.result.itemInfo.topImages;
        this.goods = new Goods(
          data.result.itemInfo,
          data.columns,
          data.result.shopInfo.services
        );
        this.shop = new Shop(data.result.shopInfo);
        this.detailInfo = data.result.detailInfo;
        this.paramInfo = data.result.itemParams;
        this.commentInfo = data.result.rate;
      });
    },
    _getRecommend() {
      return getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.data.list;
      });
    }
  }
};
</script>

<style>
.content {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
.detail-bottom-bar {
  z-index: 9;
}
</style>