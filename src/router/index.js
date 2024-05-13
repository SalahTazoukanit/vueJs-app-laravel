import Welcome from '../components/Welcome.vue';

import Products from '../components/views/products/Products.vue';
import StoreProduct from '../components/views/products/StoreProduct.vue';
import UpdateProduct from '../components/views/products/UpdateProduct.vue';
import ShowProduct from '../components/views/products/ShowProduct.vue';

import Register from '@/components/views/auths/Register.vue';
import Login from '@/components/views/auths/Login.vue';

// import store from '@/components/store';
import { isLoggedIn } from '@/components/store';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
      path:'/',
      component: Welcome,
      name:"welcome",
    },
    {
      path:'/products',
      component: Products,
      name:"products",
      meta: {requiresAuth: true } , 
    },
    {
        path:'/products/store',
        component: StoreProduct,
        name:"StoreProduct",
        meta: {requiresAuth: true } , 
    },
    {
        path:'/products/update/:id',
        component: UpdateProduct,
        name:"UpdateProduct",
        meta: {requiresAuth: true } , 
    },
    {
        path:'/products/:id',
        component: ShowProduct,
        name:"ShowProduct",
        meta: {requiresAuth: true } , 
    },
    {
        path:'/register',
        component: Register,
        name:"Register",
    },
    {
        path:'/login',
        component: Login,
        name:"Login",
    },
  ],
})

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth && !isLoggedIn()){
    next( {name : 'Login'} );
  }else{
    next();
  }
})

export default router 