import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home'
import Category from 'views/category/Category'
import ShopCart from 'views/shopCart/ShopCart'
import Profile from 'views/profile/Profile'
import Detail from 'views/detail/Detail'

Vue.use(Router)

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/Category',
        component:Category
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail',
        component:Detail
    }
]

const router = new Router({
    routes,
    mode:'history'
})

export default router