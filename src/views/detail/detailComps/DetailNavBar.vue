<template>
  <div>
    <nav-bar class="nav-bar">
      <img slot="left" class="left" src="~assets/img/common/back.svg" @click="back" alt />
      <div slot="center" class="center">
        <div
          v-for="(item,index) in title"
          :key="item"
          class="title-item"
          :class="{active:currentIndex === index}"
          @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.left {
  margin: 4px 8px 0 0;
  width:28px;
  height:28px;
}
.center {
  display: flex;
}
.title-item {
  flex: 1;
  color: black;
  font-size: 12px;
  align-items: center;
}
.active {
  color: var(--color-tint);
}
</style>