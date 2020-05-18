<template>
  <Swiper v-if="banners.length > 0">
    <SwiperItem v-for="(item,index) in banners" :key="index" class="swiper-item">
      <img :src="item" alt />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
.swiper-item{
    width:100%;
    height: 250px;
}
</style>