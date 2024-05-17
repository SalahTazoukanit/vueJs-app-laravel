<template>
    <header>
        <router-link style="text-decoration: none;" to="/register">Register</router-link>
        <router-link style="text-decoration: none;" to="/login">Login</router-link>
    </header>
    <div>
    <h1>{{ msg }}</h1>
    
    </div>
</template>

<script  >

import { ref } from 'vue';
import axios from 'axios';

let msg = ref("");

export default {
    data(){
        return {
            msg:""
        } 
    },
  mounted() {
    axios
    .get('http://127.0.0.1:8000/api/v1/welcome') 
    .then((response)=>{
        console.log(response);
        this.msg = response.data ;
    })
    .catch((error)=>{
        console.error("Une erreur s'est produite");
    })

    
  }
}

</script>

<style scoped>
header{
    display: flex;
    justify-content: space-evenly;
}
h1{
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    padding: 250px;
    color: rgb(19, 78, 19);
}
</style>