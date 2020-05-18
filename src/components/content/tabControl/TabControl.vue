<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in title" :key="index" @click="itemClick(index)" 
        :class="{active:currentIndex === index}"><span>{{item}}</span></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentIndex:0
        }
    },
    props:{
        title:{
            type:Array,
            default(){
                return ['流行','新款','精选']
            }
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
.tab-control{
    width: 100%;
    height:40px;
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 13px;
    padding: 0 5px;
}
.tab-control-item{
    flex:1;
}
.tab-control-item span {
    padding:5px;  
}
.active{
    color:var(--color-high-text);
}
/* 既是tab-control-item又是 active */
.tab-control-item.active span {
    border-bottom: 1.5px solid var(--color-high-text);
}
</style>