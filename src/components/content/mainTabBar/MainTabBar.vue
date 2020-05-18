<template>
  <tab-bar class="tab-bar">
    <tab-bar-item class="tab-bar-item" path="/home" activeColor>
      <img src="~assets/img/tabbar/home.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/home_active.svg" slot="item-active-icon" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item class="tab-bar-item" path="/category">
      <img src="~assets/img/tabbar/category.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/category_active.svg" slot="item-active-icon" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item class="tab-bar-item" path="/shopcart">
      <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-active-icon" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item class="tab-bar-item" path="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="item-icon" alt />
      <img src="~assets/img/tabbar/profile_active.svg" slot="item-active-icon" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components:{
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
.tab-bar img {
  width: 23px;
  height: 23px;
}
.tab-bar-item {
  flex: 1;
  margin-top: 5px;
}
</style>