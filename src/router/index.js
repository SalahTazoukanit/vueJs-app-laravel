import Welcome from '../components/Welcome.vue';
import Products from '../components/views/products/Products.vue';
import StoreProduct from '../components/views/products/StoreProduct.vue';
import UpdateProduct from '../components/views/products/UpdateProduct.vue';
import ShowProduct from '../components/views/products/ShowProduct.vue';

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
    },
    {
        path:'/products/store',
        component: StoreProduct,
        name:"StoreProduct",
    },
    {
        path:'/products/update/:id',
        component: UpdateProduct,
        name:"UpdateProduct",
    },
    {
        path:'/products/:id',
        component: ShowProduct,
        name:"ShowProduct",
    }
  ],
})

export default router 