import Welcome from '../components/Welcome.vue';
//products routers
import Products from '../components/views/products/Products.vue';
import StoreProduct from '../components/views/products/StoreProduct.vue';
import UpdateProduct from '../components/views/products/UpdateProduct.vue';
import ShowProduct from '../components/views/products/ShowProduct.vue';
//categories routers
import Categories from '../components/views/categories/Categories.vue';
import UpdateCategorie from '../components/views/categories/UpdateCategorie.vue';
import StoreCategorie from '../components/views/categories/StoreCategorie.vue';
//auths routers
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
    //products routes
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
    //categories routes 
  {
    path:'/categories',
    component: Categories,
    name:"Categories",
    meta: {requiresAuth: true } , 
  },
  {
    path:'/categories/update/:id',
    component: UpdateCategorie,
    name:"UpdateCategorie",
    meta: {requiresAuth: true } , 
  },
  {
    path:'/categories/store',
    component: StoreCategorie,
    name:"StoreCategorie",
    meta: {requiresAuth: true } , 
  },
  //authentifications route
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