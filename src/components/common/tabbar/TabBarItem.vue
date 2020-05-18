<template>
  <div class="tab-bar-item" @click="tabClick">
    <div v-if="!isActive" class="item-icon"><slot name="item-icon"></slot></div>
    <div v-else class="item-active-icon"><slot name="item-active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    props:{
        path:{
            type:String
        },
        activeColor:{
            type:String,
            default:'#ff5777'
        }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods:{
        tabClick(){
            this.$router.push(this.path)
        }
    }
};
</script>

<style scoped>
</style>