<template>
    <div class="goods-list">
        <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.iid"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem
    }
}
</script>

<style scoped>
.goods-list {
    display: flex;
    /*包裹*/
    flex-wrap: wrap;
    /*均等分裂*/
    justify-content: space-around;
    padding: 2px
  }
</style>