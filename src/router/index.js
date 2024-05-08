import Welcome from '../components/Welcome.vue';
import Products from '../components/views/products/Products.vue';
import StoreProduct from '../components/views/products/StoreProduct.vue';
import UpdateProduct from '../components/views/products/UpdateProduct.vue';

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
    }
  ],
})

export default router 