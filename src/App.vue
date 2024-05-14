<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Bienvenue</router-link>
        <!-- <router-link to="/products">Produits</router-link> -->
        <!-- <router-link to="/"></router-link> -->
      </nav>
    </header>
    <Welcome :msg="msg"  />
  </div>
  <router-view /> 
</template>

<script setup>

// import Welcome from './components/Welcome.vue';
// import Products from './components/views/Products.vue';

// import { createRouter, createWebHistory } from 'vue-router';
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//     {
//       path:'/',
//       component: Welcome,
//     },
//     {
//       path:'/products',
//       component: Products,
//     }
//   ],
// })


</script>
  
<style>
  nav{
    display: flex;
    gap: 5em;
  }
</style>